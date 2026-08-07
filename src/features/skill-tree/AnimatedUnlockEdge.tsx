import { BaseEdge, EdgeProps, getBezierPath } from '@xyflow/react';

export const AnimatedUnlockEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isUnlocking = data?.isUnlocking as boolean;
  const isCompleted = data?.isCompleted as boolean;
  const trackColor = (data?.trackColor as string) || "#00ffcc";

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{ ...style, strokeWidth: 2, stroke: isCompleted ? trackColor : "#334155", opacity: isCompleted ? 1 : 0.25 }} 
      />
      
      {isUnlocking && (
        <path
          d={edgePath}
          pathLength={1}
          style={{
            ...style,
            strokeWidth: 4,
            stroke: trackColor,
            strokeLinecap: "round",
            fill: "none",
            filter: `drop-shadow(0 0 12px ${trackColor})`,
          }}
          className="edge-unlock-animation"
        />
      )}
    </>
  );
};
