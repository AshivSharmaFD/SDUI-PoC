import express from "express";
import bodyParser from "body-parser";
import shapesSduiSchema from "./shapesSduiSchema.json" assert { type: "json" };
import { Shapes, actingCMSResponse } from "./shapeItems.js";
// import type { Box } from "@fanduel/formation-shared-types"

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/getShapes", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  const shapesResponse = generateShapesResponse(actingCMSResponse);
  res.send(JSON.stringify(shapesResponse));
});

// app.get("/getPersonalizedShapes/:id", (req, res) => {
//   const shapeId = req.params.id;
//   let shapesData;

//   switch (shapeId) {
//     case "1":
//       shapesData = Shapes.CIRCLE;
//       break;
//     case "2":
//       shapesData = [Shapes.TRIANGLE, Shapes.SQUARE];
//       break;
//     default:
//       shapesData = actingCMSResponse;
//       break;
//   }

//   res.setHeader("Content-Type", "application/json");

//   const shapesResponse = generateShapesResponse({ shapesData });
//   res.send(JSON.stringify(shapesResponse));
// });

app.get("/getRandomizedShapes", (_req, res) => {
  const shapesData = actingCMSResponse.sort(() => Math.random() - 0.5);

  res.setHeader("Content-Type", "application/json");

  const shapesResponse = generateShapesResponse(shapesData);
  // res.send(JSON.stringify(shapesResponse));
  res.send(JSON.stringify(shapesResponse));
});

app.get("/getHomepage", (_req, res) => {
  res.setHeader("Content-Type", "application/json");

  res.send(JSON.stringify(fakeHomepageResponse));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const generateShapesResponse = (shapesData) => {
  const shapesResponse = shapesSduiSchema;
  shapesSduiSchema.section.shapesData = shapesData;

  return shapesResponse;
};

const fakeHomepageResponse = {
  page: {
    pageName: "Home",
    sections: [
      {
        sectionName: "Top_Navigation",
        sectionComponentType: "Header",
        sectionComponentData: {
          title: "This is the Home Navigation Component",
          homeButton: {
            text: "Home",
          },
        },
      },
      {
        sectionName: "Shape_Content",
        sectionComponentType: "ShapesList",
        sectionComponentData: {
          shapesData: [
            {
              type: "ShapeItem",
              componentType: "Square",
              data: {
                color: "green",
                url: "https://en.wikipedia.org/wiki/Square",
              },
            },
            {
              type: "ShapeItem",
              componentType: "Circle",
              data: {
                color: "black",
                url: "https://en.wikipedia.org/wiki/Circle",
              },
            },
            {
              type: "ShapeItem",
              componentType: "Circle",
              data: {
                color: "red",
                url: "https://en.wikipedia.org/wiki/Circle",
              },
            },
          ],
        },
      },
      {
        sectionName: "Main_Content",
        sectionComponentType: "MainContent",
        sectionComponentData: {
          description: "Some fake description text for main content.",
          mainContentButton: {
            text: "Main Content",
          },
        },
        subSections: [
          {
            subSectionName: "Shape Content",
            subSectionComponentType: "ShapesList",
            sectionComponentData: {
              shapesData: [
                {
                  type: "ShapeItem",
                  componentType: "Square",
                  data: {
                    color: "green",
                    url: "https://en.wikipedia.org/wiki/Square",
                  },
                },
                {
                  type: "ShapeItem",
                  componentType: "Circle",
                  data: {
                    color: "black",
                    url: "https://en.wikipedia.org/wiki/Circle",
                  },
                },
                {
                  type: "ShapeItem",
                  componentType: "Circle",
                  data: {
                    color: "red",
                    url: "https://en.wikipedia.org/wiki/Circle",
                  },
                },
              ],
            },
          },
        ],
      },
      {
        sectionName: "Footer",
        sectionComponentType: "Footer",
        sectionComponentData: {
          disclaimer: "This is the footer disclaimer!",
        },
      },
    ],
  },
};
