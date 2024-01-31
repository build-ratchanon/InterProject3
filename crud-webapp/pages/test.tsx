import { Description } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { describe } from "node:test";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

function DynamicInput() {
//   const [data, setData] = React.useState([
//     {
//       detail: "",
//     },
//   ]);

//   const handleClick = () => {
//     let _data = [...data];
//     _data.push({
//       detail: "",
//     });
//     setData(_data);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i) => {
//     const { name, value } = e.target;
//     const onchangeVal = [...data] as any;
//     onchangeVal[i][name] = value;
//     setData(onchangeVal);
//   };
//   const handleDelete = (i: any) => {
//     const deleteVal = [...data];
//     deleteVal.splice(i, 1);
//     setData(deleteVal);
//   };

  ///////////////////////////////////////////////////////////////////////////

  const [allData, setAllData] = useState([
    {
      question: "",
      description: [{ detail: "" }, { detail: "" }],
    },
  ]);

  const handleAddQuestion = () => {
    let _allData = [...allData];
    _allData.push({
      question: "",
      description: [
        {
          detail: "",
        },
        {
          detail: "",
        },
      ],
    });
    setAllData(_allData);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>, i) => {
    const { name, value } = e.target;
    const _allData = [...allData] as any;
    _allData[i][name] = value;
    setAllData(_allData);
  };

  const handleDescriptionChange=(e: React.ChangeEvent<HTMLInputElement>, i, j)=>{
    const {name,value}=e.target
    const _allData = [...allData];
    _allData[i].description[j][name] = value;
    setAllData(_allData)
    console.log(allData)
}

  const handleAddDescription = (i: number) => {
    let _allData = [...allData];
    _allData[i].description.push({
      detail: "",
    });
    setAllData(_allData);
  };

  const handleDescriptionDelete = (i, j) => {
    const deleteVal = [...allData];
    deleteVal[i].description.splice(j, 1)
    setAllData(deleteVal);
  };

  const handleQuestionDelete = (i: any) => {
    const deleteVal = [...allData];
    deleteVal.splice(i, 1);
    setAllData(deleteVal);
  };

  return (
    <Grid className="App">
      {/* <Button onClick={handleClick}>Add</Button>
            {
                data.map((val,i)=>
                <Grid>
                    <TextField name="detail"  value={val.detail} onChange={(e)=>handleChange(e,i)}/>
                        
                    <Button onClick={()=>handleDelete(i)}>Delete</Button>
                </Grid>
                )
            }
            <p>{JSON.stringify(data)}</p> */}

      <Button onClick={handleAddQuestion}>Add</Button>
      {allData.map((allval, i) => (
        <Grid>
          <Typography>Question {i + 1}</Typography>
          <TextField
            required
            label="Question"
            name="question"
            value={allval.question}
            onChange={(e) => handleQuestionChange(e, i)}
          />
          {allval.description.map((val, j) => (
            <Grid>
              <TextField
                required
                id="outlined-required"
                label="Description"
                name="detail"
                value={val.detail}
                onChange={(e) => handleDescriptionChange(e, i, j)}
              />

              <IconButton aria-label="delete" 
                onClick={() => handleDescriptionDelete(i, j)}
            >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          ))}

          <Button
            variant="text"
            sx={{
              color: "#FF5C00",
              "&:hover": { color: "#d95000" },
            }}
            startIcon={<AddIcon />}
            onClick={() => {
              handleAddDescription(i);
            }}
          >
            ADD CHOICE
          </Button>

          <Button onClick={() => handleQuestionDelete(i)}>Delete Question</Button>
        </Grid>
      ))}
      <p>{JSON.stringify(allData)}</p>
    </Grid>
  );
}
export default DynamicInput;