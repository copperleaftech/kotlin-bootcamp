export class Investment {

  constructor(
    public id: number,
    public investmentTitle: string,
    public sponsorName: string,
    public requiredBy: string,
    public projectReason: string,
    public projectScope: string,
    public assets: number[],
  ) {}

}
