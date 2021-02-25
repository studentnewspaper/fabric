import { css } from "@emotion/react";
import { text } from "design/palette";
import { fonts, fontSizes, fontWeights, space } from "design/theme";
import { FunctionComponent } from "preact";

export enum UpdatesCellType {
  Stacked = "stacked",
  Inline = "inline",
}

export interface UpdatesCellProps {
  updates: { id: string; time: string; text: string; link?: string }[];
  type?: UpdatesCellType;
}

const timeStyles = css`
  font-family: ${fonts.sans};
  font-weight: ${fontWeights.bold};
  font-size: ${fontSizes.small}em;
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

const containerStyles = (type: UpdatesCellType) => {
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
}) => {
  return (
    <div css={containerStyles(type)}>
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
            {update.time}
          </div>,
          <div key={update.id + "-l"}>{text}</div>,
        ];
      })}
    </div>
  );
};

export default UpdatesCell;
