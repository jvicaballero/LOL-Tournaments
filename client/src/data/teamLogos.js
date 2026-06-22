import G2 from "../assets/G2.webp";
import BLG from "../assets/BLG.png";
import T1 from "../assets/T1.png";
import TeamLiquid from "../assets/Team Liquid.png";
import KC from "../assets/KC.png";
import DeepCross from "../assets/Deep Cross.png";
import TES from "../assets/TES.png";

// Didn't feel like reseeding my DB just for image paths, just adding/mapping them here
const teamLogos = {
  G2,
  BLG,
  T1,
  "Team Liquid": TeamLiquid,
  KCorp: KC,
  "Deep Cross Gaming": DeepCross,
  TES,
};

export default teamLogos;
