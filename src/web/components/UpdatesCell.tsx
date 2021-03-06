import { css, PropsOf } from "@emotion/react";
import { text } from "../design/palette";
import { colours, fonts, fontSizes, fontWeights, space } from "../design/theme";
import { FunctionComponent } from "preact";
import { leftPad, simpleTime, tinyRelative } from "./utils/date";
import { formatDistanceToNow } from "date-fns/esm";

export enum UpdatesCellType {
  Stacked = "stacked",
  Inline = "inline",
}

export interface UpdatesCellProps extends PropsOf<"div"> {
  updates: { id: string; timestamp: Date; text: string; link?: string }[];
  type?: UpdatesCellType;
  updatedAt?: Date;
}

const timeStyles = css`
  font-family: ${fonts.sans};
  font-weight: ${fontWeights.bold};
  font-size: ${fontSizes.small}rem;
  color: ${text.live};
  text-align: right;
`;

const stackedTimeStyles = css`
  text-align: left;

  :not(:first-of-type) {
    margin-top: ${space[3]}px;
  }
`;

const linkStyles = css`
  color: ${text.primary};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const updatedAtStyles = css`
  font-family: ${fonts.sans};
  font-size: ${fontSizes.small}rem;
  color: ${text.secondary};
  padding-top: ${space[2]}px;
  margin-top: ${space[4]}px;
  border-top: 1px solid ${colours.neutral[300]};
  width: max-content;
`;

const containerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const gridStyles = (type: UpdatesCellType) => {
  switch (type) {
    case UpdatesCellType.Stacked:
      return null;
    case UpdatesCellType.Inline:
      return css`
        display: grid;
        grid-template-columns: minmax(0, auto) minmax(0, 1fr);
        align-items: baseline;
        column-gap: ${space[3]}px;
        row-gap: ${space[1]}px;
      `;
  }
};

const UpdatesCell: FunctionComponent<UpdatesCellProps> = ({
  updates,
  type = UpdatesCellType.Stacked,
  updatedAt,
  ...props
}) => {
  return (
    <div css={containerStyles} {...props}>
      <div css={gridStyles(type)}>
        {updates.flatMap((update) => {
          const text =
            update.link != null ? (
              <a css={linkStyles} href={update.link}>
                {update.text}
              </a>
            ) : (
              update.text
            );
          return [
            <div
              css={[
                timeStyles,
                type == UpdatesCellType.Stacked && stackedTimeStyles,
              ]}
              key={update.id + "-t"}
            >
              {tinyRelative(update.timestamp)}
            </div>,
            <div key={update.id + "-l"}>{text}</div>,
          ];
        })}
      </div>
      {updatedAt != null && (
        <div css={updatedAtStyles}>Refreshed {simpleTime(updatedAt)}</div>
      )}
    </div>
  );
};

export default UpdatesCell;
