export type RANK =
  | "S"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "SA"
  | "BC"
  | "DEF"
  | "S-A"
  | "B-C"
  | "D-E-F";

export type UMA = {
  stats: {
    speed: {
      stat: number;
      score: number;
    };
    stamina: {
      stat: number;
      score: number;
    };
    power: {
      stat: number;
      score: number;
    };
    guts: {
      stat: number;
      score: number;
    };
    witness: {
      stat: number;
      score: number;
    };
  };
  aptitudes: {
    dirt: RANK;
    turf: RANK;

    sprint: RANK;
    mile: RANK;
    medium: RANK;
    long: RANK;

    front: RANK;
    pace: RANK;
    late: RANK;
    end: RANK;
  };
  unique_skills: {
    skill_level: 1 | 2 | 3 | 4 | 5 | 6;
    star_level: 1 | 2 | 3 | 4 | 5;
    score: number;
  };
};

export type UMA_TEMPLATE = {
  name: string;
  aptitudes: {
    turf: RANK;
    dirt: RANK;

    sprint: RANK;
    mile: RANK;
    medium: RANK;
    long: RANK;

    front: RANK;
    pace: RANK;
    late: RANK;
    end: RANK;
  };
};
