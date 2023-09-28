import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import spinner from "@grucloud/bau-ui/spinner";
import infraList from "../../components/infra/infraList";
import page from "../../components/page";

export default function (context: Context) {
  const { bau, stores, config } = context;
  const { h1, header } = bau.tags;
  const ButtonAdd = button(context, { color: "primary", variant: "solid" });
  const Spinner = spinner(context, { size: "lg" });
  const Page = page(context);

  const InfraList = infraList(context);

  return function Main({}) {
    stores.infra.getAll();
    return Page(
      header(
        h1("Infrastructure"),
        ButtonAdd(
          {
            href: `${config.base}/infra/create`,
          },
          "+ New Infrastructure"
        )
      ),
      InfraList(),
      Spinner({
        visibility: stores.infra.getAllQuery.loading,
      })
    );
  };
}