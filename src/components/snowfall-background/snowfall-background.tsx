import {Snowfall} from "react-snowfall";

export default function SnowfallBackground() {
    return (
        // GitHub project: https://github.com/cahilfoley/react-snowfall
        <Snowfall
            color={"white"}
            snowflakeCount={100}
            radius={[0, 0.5]}
            speed={[0, 0.5]}
            wind={[-2, 0.5]}
        />
    )
}