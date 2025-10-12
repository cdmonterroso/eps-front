export interface EstadoInterface {
    completionstatus: {
        completed: boolean;
        aggregation: number;
        completions: [];
    };
    warnings: any[];
}
