import { Space } from "../model/Model";

export class DataService {
  public async getSpaces(): Promise<Space[]> {
    const result: Space[] = [];
    result.push({
      location: "Paris",
      name: "Hello place",
      spaceId: "123",
    });
    result.push({
      location: "Paris",
      name: "Hello place",
      spaceId: "124",
    });
    result.push({
      location: "Paris",
      name: "Hello place",
      spaceId: "125",
    });
    result.push({
      location: "Paris",
      name: "Hello place",
      spaceId: "126",
    });

    return result;
  }

  public async reserveSpace(spaceId: string): Promise<string | undefined> {
    if (spaceId === "123") {
      return "5555";
  } else {
      return undefined;
    }
  }
}
