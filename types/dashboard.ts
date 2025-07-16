export type ChartData = {
 month: string;
 students: number;
 label: string;
};

export type StatsCardProps = {
 title: string;
 value: string;
 icon: React.ReactNode;
 progress: number;
 description: string;
 gradientFrom: string;
 gradientTo: string;
 decorationFrom: string;
 decorationTo: string;
 progressColor: string;
 blurColor?: string;
 textColor: string;
};
