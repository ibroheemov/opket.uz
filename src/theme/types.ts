export interface Theme {
    mode: 'light' | 'dark';
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        card: string;
    };
}
