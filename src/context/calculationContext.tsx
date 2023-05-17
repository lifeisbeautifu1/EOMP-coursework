import { createContext, useContext, useState } from "react";
import {
  calculateIteration,
  calculateModuleOfComplexNumber,
} from "../utils/calculate";

const calculationContext = createContext<{
  firstGraph: Array<any>;
  secondGraph: Array<any>;
  setFirstGraph: React.Dispatch<React.SetStateAction<any[]>>;
  setSecondGraph: React.Dispatch<React.SetStateAction<any[]>>;
  solve: (l: number, L: number, n: number, λ: number, t: number) => void;
  loading: boolean;
}>({
  firstGraph: [],
  secondGraph: [],
  setFirstGraph: () => {},
  setSecondGraph: () => {},
  solve: (l: number, L: number, n: number, λ: number, t: number) => {},
  loading: false,
});

type CalculationContextProviderProps = {
  children: React.ReactNode;
};

const CalculationContextProvider: React.FC<CalculationContextProviderProps> = ({
  children,
}) => {
  const [firstGraph, setFirstGraph] = useState<any[]>([]);

  const [secondGraph, setSecondGraph] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  let colors: Array<string> = ["#f97316", "#22c55e", "#3b82f6", "#f43f5e"];

  const solve = (l: number, L: number, n: number, λ: number, t: number) => {
    setLoading(true);

    let data: Array<any> = [];

    let tmp = L / 4;
    let interval = [
      Math.round(tmp),
      Math.round(tmp * 2),
      Math.round(tmp * 3),
      L,
    ];

    let firstGraphTmp: any[] = [];

    interval.forEach((z, i) => {
      data = [];
      for (let x = 0; x <= l; x += 0.1) {
        let R = 0;
        let IM = 0;
        for (let j = 1; j <= t; ++j) {
          const [tmpR, tmpIM] = calculateIteration(l, n, z, λ, j, x);
          R += tmpR;
          IM += tmpIM;
        }
        data.push({
          x,
          u: calculateModuleOfComplexNumber([R, IM]),
        });
      }
      firstGraphTmp.push({
        data,
        name: `z = ${z}`,
        color: colors[i],
      });
    });

    tmp = l / 8;

    let xInterval = [
      Math.round(tmp),
      Math.round(tmp * 2),
      Math.round(tmp * 3),
      Math.ceil(tmp * 4),
    ];

    let secondGraphTmp: any[] = [];

    xInterval.forEach((x, i) => {
      data = [];
      for (let z = 0; z <= L; z += 0.1) {
        let R = 0;
        let IM = 0;
        for (let j = 1; j <= t; ++j) {
          const [tmpR, tmpIM] = calculateIteration(l, n, z, λ, j, x);
          R += tmpR;
          IM += tmpIM;
        }
        data.push({
          z,
          u: calculateModuleOfComplexNumber([R, IM]),
        });
      }
      secondGraphTmp.push({
        data,
        name: `x = ${x}`,
        color: colors[i],
      });
    });

    setFirstGraph(firstGraphTmp);

    setSecondGraph(secondGraphTmp);

    setLoading(false);
  };

  return (
    <calculationContext.Provider
      value={{
        firstGraph,
        secondGraph,
        setFirstGraph,
        setSecondGraph,
        solve,
        loading,
      }}
    >
      {children}
    </calculationContext.Provider>
  );
};

export default CalculationContextProvider;

export const useCalculationContext = () => useContext(calculationContext);
