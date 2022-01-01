export interface JobInterface {
    id: string;
    title: string;
    type: string;
    description: string;
    company: string;
    company_url: string;
    company_logo: string;
    location: string;
    url: string;
    requirements: string[];
    what_you_will_do: string[];
    salary: string;
    created_at: string;
}
export interface menuItem {
    title: string;
    url: string;
}