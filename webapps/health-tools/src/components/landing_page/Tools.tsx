import { Grid, Typography } from "@mui/material";
import {
  ITool,
  ToolStatus,
  toolGroups,
} from "../../configs/LandingPageToolsConfig";
import Toolcard from "./Toolcard";

function removeInactiveTools(tools: ITool[]) {
  return tools.filter((toolObject) => toolObject.status != ToolStatus.inactive);
}

function Tools() {
  return (
    <>
      <Grid container rowSpacing={2}>
        {toolGroups.map((toolGroup, index) => (
          <>
            <Grid
              key={index}
              container
              item
              bgcolor={
                index % 2 == 1 ? "background.paper" : "background.default"
              }
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                container
                maxWidth={{ lg: "lg", xl: "xl" }}
                rowSpacing={7}
                columnSpacing={3}
                padding={10}
                alignItems="center"
                justifyContent="center"
              >
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={3}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item alignItems="center" justifyContent="center">
                    <Typography variant="h2" align="center">
                      {toolGroup.title}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      variant="h5"
                      align="center"
                      color="text.secondary"
                    >
                      {toolGroup.description}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  columnSpacing={{
                    xs: 4,
                    lg: 6,
                    xl:
                      removeInactiveTools(toolGroup.tools).length !== 2
                        ? 1
                        : 20,
                  }}
                  rowSpacing={{ xs: 4 }}
                >
                  {removeInactiveTools(toolGroup.tools).map(
                    (toolObject, index) => (
                      <Grid
                        key={index}
                        container
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={
                          removeInactiveTools(toolGroup.tools).length > 2
                            ? 4
                            : removeInactiveTools(toolGroup.tools).length == 2
                            ? 6
                            : 12
                        }
                        alignItems="center"
                        sx={{
                          justifyContent: {
                            xs: "center",
                            lg:
                              removeInactiveTools(toolGroup.tools).length !== 2
                                ? "center"
                                : index % 2 == 1
                                ? "flex-start"
                                : "flex-end",
                          },
                        }}
                      >
                        <Toolcard
                          title={toolObject.title}
                          description={toolObject.description}
                          image={toolObject.image}
                          link={toolObject.link}
                          status={toolObject.status}
                        ></Toolcard>
                      </Grid>
                    )
                  )}
                </Grid>
              </Grid>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
}

export default Tools;
