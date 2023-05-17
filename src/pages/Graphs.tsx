import { useNavigate } from "react-router-dom";
import {
  Legend,
  Line,
  Label,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
  CartesianGrid,
} from "recharts";
import { useCalculationContext } from "../context/calculationContext";

const Graphs = () => {
  const { firstGraph, secondGraph, setFirstGraph, setSecondGraph } =
    useCalculationContext();

  const dataFormater = (num: number) => {
    return num.toFixed(1);
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 py-12 items-center">
      <p className="font-light text-xl text-gray-900">
        График модуля комплексной амплитуды при фиксированном z
      </p>
      <ComposedChart
        width={730}
        height={250}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          tickFormatter={dataFormater}
          allowDuplicatedCategory={false}
        >
          <Label value="x" position="insideBottomRight" />
        </XAxis>
        <YAxis tickFormatter={dataFormater}>
          <Label value="u" position="insideTopLeft" />
        </YAxis>
        <Tooltip />
        <Legend />

        {firstGraph.map((i) => (
          <Line
            type="monotone"
            dot={false}
            dataKey="u"
            data={i.data}
            name={i.name}
            key={i.name}
            stroke={i.color}
          />
        ))}
      </ComposedChart>

      <p className="font-light text-xl text-gray-900">
        График модуля комплексной амплитуды при фиксированном x
      </p>
      <ComposedChart
        width={730}
        height={250}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          tickFormatter={dataFormater}
          dataKey="z"
          allowDuplicatedCategory={false}
        >
          <Label value="z" position="insideBottomRight" />
        </XAxis>
        <YAxis tickFormatter={dataFormater}>
          <Label value="u" position="insideTopLeft" />
        </YAxis>
        <Tooltip />
        <Legend />

        {secondGraph.map((i) => (
          <Line
            type="monotone"
            dot={false}
            dataKey="u"
            data={i.data}
            name={i.name}
            key={i.name}
            stroke={i.color}
          />
        ))}
      </ComposedChart>
      <button
        onClick={() => {
          setFirstGraph([]);
          setSecondGraph([]);
          navigate("/");
        }}
        type="button"
        className="py-2.5 px-10 text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:text-blue-700 inline-flex items-center"
      >
        Назад
      </button>
    </div>
  );
};

export default Graphs;
