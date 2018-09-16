import React, { Component } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryTheme
} from "victory";
import { parse, format } from "date-fns";

import activeByDate from "./data/activeByDate.json";
import potentialByDate from "./data/potentialByDate.json";

class App extends Component {
  render() {
    const potentialData = Object.keys(potentialByDate).map((key, index) => ({
      x: parse(key),
      y: potentialByDate[key]
    }));

    const activeData = Object.keys(activeByDate).map((key, index) => ({
      x: parse(key),
      y: activeByDate[key]
    }));

    return (
      <div className="App">
        <div className="mw7 center">
          <VictoryChart>
            <VictoryLine
              style={{
                data: { stroke: "red" },
                parent: { border: "1px solid #ccc" }
              }}
              interpolation="natural"
              data={activeData}
            />
            <VictoryAxis
              dependentAxis
              domain={[0, 250]}
              tickValues={[0, 50, 100, 150, 200, 250]}
              style={{
                axis: { stroke: "transparent" },
                axisLabel: { fontSize: 12, padding: 36 },
                tickLabels: { fontSize: 8 },
                grid: { stroke: "rgba(0,0,0,0.125)" }
              }}
            />
            <VictoryAxis
              crossAxis
              domain={[parse("14-Oct-14"), parse("16-Sep-18")]}
              tickValues={[
                parse("14-Oct-14"),
                parse("18-Nov-16"),
                parse("18-Jun-17"),
                parse("18-May-18"),
                parse("15-Sep-18")
              ]}
              tickFormat={x => {
                const date = format(parse(x), "MMM 'YY");
                if (date == "Nov '16") return "SN1";
                if (date == "Jun '17") return "SN2";
                if (date == "May '18") return "NYCHA";
                return date;
              }}
              style={{
                axis: { stroke: "transparent" },
                axisLabel: { fontSize: 8, padding: 36 },
                tickLabels: { fontSize: 8 },
                grid: { stroke: "rgba(0,0,0,0.125)" }
              }}
            />
          </VictoryChart>
        </div>

        <div className="mw7 center">
          <VictoryChart minDomain={{ x: parse("18-Apr-17") }}>
            <VictoryLine
              style={{
                data: { stroke: "#ccc" },
                parent: { border: "1px solid #ccc" }
              }}
              data={potentialData}
              interpolation="natural"
            />
            <VictoryLine
              style={{
                data: { stroke: "red" },
                parent: { border: "1px solid #ccc" }
              }}
              data={activeData}
              interpolation="natural"
            />
            <VictoryAxis
              dependentAxis
              label="Active / Potential Nodes"
              domain={[0, 2500]}
              tickValues={[0, 500, 1000, 1500, 2000, 2500]}
              style={{
                axis: { stroke: "transparent" },
                axisLabel: { fontSize: 8, padding: 36 },
                tickLabels: { fontSize: 8 },
                grid: { stroke: "rgba(0,0,0,0.125)" }
              }}
            />
            <VictoryAxis
              crossAxis
              tickValues={[
                parse("1-Jul-17"),
                parse("1-Oct-17"),
                parse("1-Jan-18"),
                parse("1-Apr-18"),
                parse("1-Jul-18"),
                parse("15-Sep-18")
                // parse("18-Jun-17"),
                // parse("18-May-18")
              ]}
              tickFormat={x => {
                const date = format(parse(x), "MMM 'YY");
                if (date == "Nov '16") return "SN1";
                if (date == "Jun '17") return "SN2";
                if (date == "May '18") return "NYCHA";
                return date;
              }}
              style={{
                axis: { stroke: "transparent" },
                axisLabel: { fontSize: 8, padding: 36 },
                tickLabels: { fontSize: 8 },
                grid: { stroke: "rgba(0,0,0,0.125)" }
              }}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
