export interface CardData {
    source: string | StaticImageData;
    blurb: string;
    title: string;
    techLogos: {
        [key: string]: string | StaticImageData
    }
    indepth: {
        blurb: string;
        steps?: string[];
        learned: string[];
    }
}

export interface MediaCardProps extends Partial<CardData> {
    style?: CSSProperties
    className?: string
}

export interface MainCard extends Partial<CardData> {
    handleVis: () => void;
    constainerStyle?: CSSProperties;
    className?: string
    imgsrc?: string
}

export interface ProjectCardProps extends Partial<CardData> {
    titlestyle?: CSSProperties;
    borderStyle?: CSSProperties;
    borderClass? : string;
    titleclass?: string;
    hovered?: boolean
}