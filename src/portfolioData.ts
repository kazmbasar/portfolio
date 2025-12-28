export interface Project {
    title: string;
    description: string;
    link?: string;
}

export interface SkillGroup {
    category: string;
    items: string[];
}

export interface SocialLink {
    name: string;
    url: string;
}

export const portfolioData = {
    name: "KAZIM BAŞAR",
    title: "Fullstack Developer",
    tagline: "Planlı çalışma alışkanlığımı öğrenme azmimle birleştiriyor, her yeni projeyi kendimi aşmak için bir fırsat olarak görüyorum. Hedefim, teknolojiyi ve yenilikçi yaklaşımları kullanarak kullanıcı deneyimini en üst seviyeye taşıyan projeler geliştirmektir.",
    status: "Şu an açık: Yeni Projeler",
    projects: [
        {
            title: "Tuneshift",
            description: "Spotify üzerindeki playlistleri YouTube Music'e aktarmak için geliştirilmiş kapsamlı bir web uygulaması."
        },
        {
            title: "E-Commerce",
            description: "Modern alışveriş deneyimi sunan, performans odaklı fullstack e-ticaret platformu."
        },
        {
            title: "OtoMuhasebe",
            description: "Otomobil tamir atölyeleri için özel olarak tasarlanmış; müşteri kayıt ve işlem takip odaklı ön muhasebe programı."
        }
    ] as Project[],
    skills: [
        { category: "Teknolojiler", items: ["C#", ".Net", "Angular", "TypeScript", "SQL"] },
        { category: "Araçlar & Metotlar", items: ["Figma", "Visual Studio", "Git / GitHub", "Agile"] }
    ] as SkillGroup[],
    contact: {
        email: "kazmbasar@gmail.com",
        social: [
            { name: "LinkedIn", url: "#" },
            { name: "GitHub", url: "#" },
            { name: "Twitter / X", url: "#" }
        ] as SocialLink[]
    }
};
