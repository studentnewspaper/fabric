export const constrain = (width: string, hideFrame = false) => (Story: any) => (
  <div
    style={{
      width,
      border: hideFrame ? `unset` : `1px solid rgba(0, 0, 0, 0.2)`,
      padding: hideFrame ? `unset` : `16px`,
    }}
  >
    <Story />
  </div>
);
