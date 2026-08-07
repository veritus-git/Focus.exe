import { EdgeProps, getStraightPath } from '@xyflow/react';

export const AnimatedUnlockEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  id,
  data,
}: EdgeProps) => {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const isUnlocking = data?.isUnlocking as boolean;
  const isActive = data?.isActive as boolean; // True if source is done and target is at least active
  const trackColor = (data?.trackColor as string) || "#00ffcc";
  const maskId = `mask-${id}`;

  return (
    <>
      {isUnlocking && (
        <defs>
          <mask id={maskId}>
            <path
              d={edgePath}
              pathLength={1}
              stroke="white"
              strokeWidth={10}
              fill="none"
              strokeLinecap="round"
              className="edge-unlock-animation"
            />
          </mask>
        </defs>
      )}

      {/* Background / Solid Active edge */}
      <path
        d={edgePath}
        fill="none"
        style={{ 
          ...style, 
          strokeWidth: isActive ? 2.5 : 2, 
          stroke: isActive ? trackColor : "#334155", 
          opacity: isActive ? 1 : 0.25,
          strokeDasharray: "6 6"
        }} 
        className="edge-dash-move"
      />
      
      {/* Foreground dashed animating edge */}
      {isUnlocking && (
        <path
          d={edgePath}
          mask={`url(#${maskId})`}
          style={{
            ...style,
            strokeWidth: 4,
            stroke: trackColor,
            strokeDasharray: "6 6",
            fill: "none",
            filter: `drop-shadow(0 0 10px ${trackColor})`,
          }}
          className="edge-dash-move"
        />
      )}
    </>
  );
};
