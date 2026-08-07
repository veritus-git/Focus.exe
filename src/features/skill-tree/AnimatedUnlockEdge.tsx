import { EdgeProps, getBezierPath, Position } from '@xyflow/react';

export const AnimatedUnlockEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  id,
  data,
}: EdgeProps) => {
  // Determine dynamic positions based on relative coordinates to create a radial bloom effect
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  
  let dynamicSourcePos = Position.Bottom;
  let dynamicTargetPos = Position.Top;
  
  if (Math.abs(dx) > Math.abs(dy)) {
    dynamicSourcePos = dx > 0 ? Position.Right : Position.Left;
    dynamicTargetPos = dx > 0 ? Position.Left : Position.Right;
  } else {
    dynamicSourcePos = dy > 0 ? Position.Bottom : Position.Top;
    dynamicTargetPos = dy > 0 ? Position.Top : Position.Bottom;
  }

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition: dynamicSourcePos,
    targetX,
    targetY,
    targetPosition: dynamicTargetPos,
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
