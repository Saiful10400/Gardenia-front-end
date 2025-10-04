import React from "react";



const SkeletonGeneRator = ({ quantity, component }: { quantity: number, component: React.ReactElement }) => {
    const components = []

    for (let i = 0; i < quantity; i++) {
        components.push(component)
    }

    return <>{...components}</>
};

export default SkeletonGeneRator;