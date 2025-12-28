
export const getReadmeImage = async (repo: string): Promise<string | null> => {
    try {
        // Try main branch first, then master
        const branches = ['main', 'master'];

        for (const branch of branches) {
            const readmeUrl = `https://raw.githubusercontent.com/${repo}/${branch}/README.md`;
            const response = await fetch(readmeUrl);

            if (response.ok) {
                const text = await response.text();

                // Match Markdown images: ![alt](url)
                const mdMatch = text.match(/!\[.*?\]\((.*?)\)/);

                // Match HTML images: <img src="url">
                const htmlMatch = text.match(/<img[^>]+src=["'](.*?)["']/);

                let imageUrl = mdMatch ? mdMatch[1] : (htmlMatch ? htmlMatch[1] : null);

                if (imageUrl) {
                    // Handle relative URLs
                    if (!imageUrl.startsWith('http')) {
                        // Remove leading ./ if present
                        const cleanPath = imageUrl.replace(/^\.\//, '');
                        imageUrl = `https://raw.githubusercontent.com/${repo}/${branch}/${cleanPath}`;
                    }
                    return imageUrl;
                }
            }
        }
    } catch (error) {
        console.warn(`Failed to fetch README for ${repo}:`, error);
    }
    return null;
};
