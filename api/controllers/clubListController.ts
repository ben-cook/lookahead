import { Request, Response } from "express";
import { getClubSheetData } from "../../google-sheets/sheets";

interface ISponsor {
  name: string;
  logoURL: string;
  description: string;
  umsu: string;
  tier: string;
  facebook: string;
  include: string[];
}
const processRawClubData = (data: string[][]): ISponsor[] => {
  const allSponsors: ISponsor[] = [];
  for (const row of data) {
    console.log(row);
    const [name, logoURL, description, umsu, facebook, tier, include] = row;
    let includeArray: string[] = [];
    if (include) {
      includeArray = include.split(",");
    }
    const sponsor: ISponsor = {
      name,
      logoURL,
      description,
      umsu,
      facebook,
      tier,
      include: includeArray
    };
    allSponsors.push(sponsor);
  }
  return allSponsors;
};
export const getClubs = async (req: Request, res: Response) => {
  const data = await getClubSheetData();
  res.send(processRawClubData(data));
};
