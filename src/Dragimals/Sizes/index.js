import { useWindowDimensions } from "react-native";
import * as animalIcons from "../Animals";

export const useAnimalData = (animal) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 600 || false;
  const scale = isMobile ? 0.75 : 1;
  const Icon = animalIcons[animal];
  const puckStyle = {
    width: 120 * scale,
    height: 120 * scale,
    borderRadius: 60 * scale,
    borderWidth: 4 * scale,
  };

  switch (animal) {
    case "Bear": {
      return {
        iconSize: 80 * scale,
        iconStyle: {
          marginTop: 4 * scale,
        },
        Icon,
        puckStyle,
      };
    }
    case "Cat": {
      return {
        iconSize: 100 * scale,
        iconStyle: {
          marginTop: 4 * scale,
        },
        Icon,
        puckStyle,
      };
    }
    case "Chicken": {
      return {
        iconSize: 80 * scale,
        iconStyle: {
          marginTop: -4 * scale,
        },
        Icon,
        puckStyle,
      };
    }
    case "Cow": {
      return {
        iconSize: 80 * scale,
        iconStyle: {},
        Icon,
        puckStyle,
      };
    }
    case "Dog": {
      return {
        iconSize: 76 * scale,
        iconStyle: {
          marginTop: 2 * scale,
        },
        Icon,
        puckStyle,
      };
    }
    case "Frog": {
      return {
        iconSize: 80 * scale,
        iconStyle: {},
        Icon,
        puckStyle,
      };
    }
    case "Gorilla": {
      return {
        iconSize: 88 * scale,
        iconStyle: {},
        Icon,
        puckStyle,
      };
    }
    case "Koala": {
      return {
        iconSize: 96 * scale,
        iconStyle: {
          marginTop: 8 * scale,
        },
        Icon,
        puckStyle,
      };
    }
    case "Lion": {
      return {
        iconSize: 80 * scale,
        iconStyle: {},
        Icon,
        puckStyle,
      };
    }
    case "Monkey": {
      return {
        iconSize: 92 * scale,
        iconStyle: {},
        Icon,
        puckStyle,
      };
    }
    case "Owl": {
      return {
        iconSize: 88 * scale,
        iconStyle: {},
        Icon,
        puckStyle,
      };
    }
    case "Panda": {
      return {
        iconSize: 80 * scale,
        iconStyle: {
          marginTop: 6 * scale,
        },
        Icon,
        puckStyle,
      };
    }
    case "Penguin": {
      return {
        iconSize: 84 * scale,
        iconStyle: {},
        Icon,
        puckStyle,
      };
    }
    case "Pig": {
      return {
        iconSize: 86 * scale,
        iconStyle: {
          marginTop: 4 * scale,
        },
        Icon,
        puckStyle,
      };
    }
    case "Raccoon": {
      return {
        iconSize: 90 * scale,
        iconStyle: {},
        Icon,
        puckStyle,
      };
    }
    case "Sheep": {
      return {
        iconSize: 86 * scale,
        iconStyle: {},
        Icon,
        puckStyle,
      };
    }
    default: {
      return {
        Icon,
        iconSize: 80 * scale,
        puckStyle,
        iconStyle: {
          marginTop: 4 * scale,
        },
      };
    }
  }
};
