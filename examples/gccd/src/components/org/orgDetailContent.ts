import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css } = context;
  const { h2, table, tr, td, th, section } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });
  return function OrgDetailContent({ org_id }: any) {
    return section(
      h2("Summary"),
      TableContainer(table(tr(th("Organisation Id"), td(org_id))))
    );
  };
}