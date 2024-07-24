import { getHtml } from './scrapper'; // Adjust the path as needed
import { parseJobListings } from './scrapper'; // Adjust the path as needed

// Mock the global fetch function
global.fetch = jest.fn();

describe('getHtml', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return HTML content for a successful request', async () => {
        const mockHtml = '<html><body><h1>Hello, world!</h1></body></html>';
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            text: jest.fn().mockResolvedValueOnce(mockHtml),
        });

        const url = 'https://example.com';
        const result = await getHtml(url);

        expect(result).toBe(mockHtml);
        expect(fetch).toHaveBeenCalledWith(url);
    });

    it('should throw an error for a failed request', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: 'Not Found',
        });

        const url = 'https://example.com';
        await expect(getHtml(url)).rejects.toThrow('Failed to fetch the page: Not Found');
        expect(fetch).toHaveBeenCalledWith(url);
    });

    it('should handle network errors', async () => {
        const errorMessage = 'Network error';
        (fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const url = 'https://example.com';
        await expect(getHtml(url)).rejects.toThrow(errorMessage);
        expect(fetch).toHaveBeenCalledWith(url);
    });
});

describe('parseJobListings', () => {
    it('should return an empty array if vagasContainer is not found', () => {
        const html = '<div id="vagas-api"></div>';
        const result = parseJobListings(html);
        expect(result).toEqual([]);
    });

    it('should parse job listings correctly', () => {
        const html = `
            <div id="vagas-api">
                <div class="ultimas-vagas">
                    <div class="vaga-item">
                        <div class="local-vaga">Location 1</div>
                        <div class="codigo-vaga">Código 12345</div>
                        <div class="nome-vaga">Job Title 1</div>
                        <div class="desc-vaga">Description 1</div>
                        <div class="data-vaga">2024-07-24</div>
                    </div>
                    <div class="vaga-item">
                        <div class="local-vaga">Location 2</div>
                        <div class="codigo-vaga">Código 67890</div>
                        <div class="nome-vaga">Job Title 2</div>
                        <div class="desc-vaga">Description 2</div>
                        <div class="data-vaga">2024-07-25</div>
                    </div>
                </div>
            </div>
        `;
        const result = parseJobListings(html);
        expect(result).toEqual([
            {
                codigoVaga: '12345',
                localVaga: 'Location 1',
                dataVaga: '2024-07-24',
                nomeVaga: 'Job Title 1',
                descVaga: 'Description 1',
            },
            {
                codigoVaga: '67890',
                localVaga: 'Location 2',
                dataVaga: '2024-07-25',
                nomeVaga: 'Job Title 2',
                descVaga: 'Description 2',
            },
        ]);
    });

    it('should handle missing elements gracefully', () => {
        const html = `
            <div id="vagas-api">
                <div class="ultimas-vagas">
                    <div class="vaga-item">
                        <div class="local-vaga"></div>
                        <div class="codigo-vaga"></div>
                        <div class="nome-vaga"></div>
                        <div class="desc-vaga"></div>
                        <div class="data-vaga"></div>
                    </div>
                </div>
            </div>
        `;
        const result = parseJobListings(html);
        expect(result).toEqual([
            {
                codigoVaga: '',
                localVaga: '',
                dataVaga: '',
                nomeVaga: '',
                descVaga: '',
            },
        ]);
    });
});


