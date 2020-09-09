import React from "react";
import { storiesOf } from "@storybook/react";

import Janus from "./Janus";
import description from "./Janus.md";

storiesOf("Janus", module).add("Overview", () => <Janus />, {
  notes: { markdown: description }
});
