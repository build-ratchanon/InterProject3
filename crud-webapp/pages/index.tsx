import Head from "next/head";
import Image from "next/image";
import { Griffy, Inter, Prompt } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Box,
  Button,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { useState } from "react";
import _ from "lodash";


export default function Home() {
  const [questionnaire, setQuestionnaire] = useState("");

  const [errorQn, setErrorQn] = React.useState(false);
  const [helperTextQn, setHelperTextQn] = React.useState('');

  const [allData, setAllData] = useState([
    {
      question: "",
      qerror: false, 
      qerrorText: "" ,
      description: [
        { option: false, detail: "", helptext: "", error: false, errorText: "" },
        { option: false, detail: "", helptext: "", error: false, errorText: "" },
      ],
    },
  ]);

  const handleCancel = () => {
    setQuestionnaire("")
    setAllData([
      {
        question: "",
        qerror: false, 
        qerrorText: "" ,
        description: [
          { option: false, detail: "", helptext: "", error: false, errorText: "" },
          { option: false, detail: "", helptext: "", error: false, errorText: "" },
        ],
      },
    ])
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const _questionnaire = _.clone(questionnaire)
    if(_questionnaire === ""){
      console.log('qn check')
      setHelperTextQn('Please fill in this option.');
      setErrorQn(true);
    }
    else{
      setHelperTextQn('');
      setErrorQn(false);
    }

    const _allData = _.cloneDeep(allData)

    for (let i = 0; i < _allData.length; i++) {
      console.log('loop1')
      if(_allData[i].question === ''){
        console.log('q check')
        _allData[i].qerrorText = 'Please fill in this option.';
        _allData[i].qerror = true;
      }
      else{
        _allData[i].qerrorText = ' ';
        _allData[i].qerror = false;
      }
      // const element = data[index];
      for (let j = 0; j < _allData[i].description.length; j++) {
        console.log('loop2')
        if(_allData[i].description[j].detail === ''){
          console.log('detail missing', j)
          _allData[i].description[j].errorText = 'Please fill in this option.';
          _allData[i].description[j].error = true;
          console.log( _allData[i].description[j].error)
        }
        else{
          console.log(j, 'detail ok')
          _allData[i].description[j].errorText = ' ';
          _allData[i].description[j].error = false;
          console.log( _allData[i].description[j].error)
        }
      }
    }

    console.log(questionnaire)
    console.log(allData);
    setAllData(_allData)
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
    const { name, value } = e.target;
    const _allData = _.cloneDeep(allData) as any;
    _allData[i][name] = value;
    setAllData(_allData);
    console.log(allData);
  };

  const handleRadio = (i: number, j: number) => {
    const _allData = _.clone(allData);

    allData[i].description.map((data, x) => {
      if (j == x) {
        data.option = true;
        data.helptext = "This answer is correct";
      } else {
        data.option = false;
        data.helptext = "";
      }
    });

    setAllData(_allData);
    console.log(allData);
  };

  const handleDescriptionChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number, j: number ) => {
    const { name, value } = e.target;
    const _allData = _.cloneDeep(allData) as any;
    _allData[i].description[j][name] = value;
    setAllData(_allData);
    console.log(allData);
  };

  const handleAddDescription = (i: number) => {
    const _allData = _.cloneDeep(allData);
    _allData[i].description.push({
      option: false,
      detail: "",
      helptext: "",
      error: false, 
      errorText: ""
    });
    setAllData(_allData);
  };

  const handleDescriptionDelete = (i: number, j: number) => {
    const deleteVal = _.cloneDeep(allData);
    deleteVal[i].description.splice(j, 1);
    setAllData(deleteVal);
  };

  const handleDuplicate = (i: any) => {
    const _allData = _.cloneDeep(allData);
    const _description = _.cloneDeep(allData[i].description);

    console.log(_allData[i]);

    _allData.push({
      question: _allData[i].question,
      qerror: _allData[i].qerror,
      qerrorText: _allData[i].qerrorText,
      description: _description,
    });

    setAllData(_allData);
    console.log(allData);
  };

  const handleQuestionDelete = (i: number) => {
    const deleteVal = _.cloneDeep(allData);
    deleteVal.splice(i, 1);
    setAllData(deleteVal);
  };

  const handleAddQuestion = () => {
    // const _allData = [...allData];
    const _allData = _.cloneDeep(allData);

    _allData.push({
      question: "",
      qerror: false, 
      qerrorText: "" ,
      description: [
        {
          option: false,
          detail: "",
          helptext: "",
          error: false, 
          errorText: ""
        },
        {
          option: false,
          detail: "",
          helptext: "",
          error: false, 
          errorText: ""
        },
      ],
    });
    setAllData(_allData);
    console.log(allData);
  };

  return (
    <>
      <Head>
        <title>Foxbith Questionnaire</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Question */}
      <form
        // component="form"
        // sx={{ background: "#F3F4F6" }}
        onSubmit={handleSave}

      >
        <Grid
          sx={{ "& button": { m: 1 } }}
          paddingY={1}
          className={styles.navBar}
        >
          <Grid className={styles.logo} marginY={2} marginLeft={3}>
            🦊 Foxbith Questionnaire
          </Grid>
          <hr />
          <Grid
            margin={1.5}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "#FF5C00",
                border: "1px solid #FF5C00",
                "&:hover": { borderColor: "#d95000" },
                px: 2,
              }}
              onClick={handleCancel}
            >
              cancel
            </Button>

            <Button
              variant="contained"
              size="large"
              sx={{
                color: "#FFF",
                backgroundColor: "#FF5C00",
                "&:hover": { backgroundColor: "#d95000" },
                width: 180,
                px: 2,
              }}
              type="submit"
            >
              save
            </Button>
          </Grid>
        </Grid>

        <Paper sx={{ margin: 3 }}>
          <Grid sx={{ p: 3 }}>
            <Typography className={styles.question} paddingBottom={3}>
              Questionnaire Detail
            </Typography>
            <TextField
              // required
              error={errorQn}
              id="outlined-required"
              fullWidth
              label="Questionnaire*"
              name="questionnaire"
              value={questionnaire}
              onChange={(e) => {
                setQuestionnaire(e.target.value);
              }}
            />
            <FormHelperText sx={{color: 'red'}}>{helperTextQn}</FormHelperText>

          </Grid>
          <hr />

          {allData.map((allval, i) => (
            <Grid sx={{ p: 3 }}>
              <Grid>
                <Typography className={styles.question} paddingBottom={3}>
                  Question {i + 1}
                </Typography>

                <Grid sx={{ mb: 3 }}>
                  <TextField
                    error={allval.qerror ? true : false}
                    id="outlined-required"
                    fullWidth
                    label="Question*"
                    name="question"
                    value={allval.question}
                    onChange={(e) => handleQuestionChange(e, i)}
                  />
                  <FormHelperText sx={{color: 'red'}}>{allval.qerrorText}</FormHelperText>
                </Grid>
                
                {/* description */}
                {allval.description.map((val, j) => (
                  <Grid display={"flex"} alignItems={"center"} justifyContent={'space-between'} sx={{ mb: 3 }}>
                    <RadioGroup
                      sx={{
                        display: "flex",
                        flexWrap: "nowrap",
                        flexDirection: "row",
                      }}
                      onChange={() => handleRadio(i, j)}
                    >
                      <FormControlLabel
                        control={<Radio checked={val.option} />}
                        label=""
                        name="Check"
                      />
                    </RadioGroup>

                    <Grid sx={{flexGrow: '1'}}>
                      <TextField
                      // required
                      error={val.error ? true : false}
                      id="outlined-required"
                      fullWidth
                      label="Description*"
                      name="detail"
                      value={val.detail}
                      onChange={(e) => handleDescriptionChange(e, i, j)}
                      />
                      <FormHelperText sx={{color: 'red'}}>{val.errorText}</FormHelperText>
                      <FormHelperText>{val.helptext}</FormHelperText>
                    </Grid>

                    <IconButton
                      aria-label="delete"
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
                <hr className={styles.hr} />
                <Grid>
                  <Button
                    variant="text"
                    sx={{
                      color: "#000",
                      "&:hover": { color: "#123456" },
                    }}
                    startIcon={<ContentCopyIcon />}
                    onClick={() => handleDuplicate(i)}
                  >
                    DUPLICATE
                  </Button>
                  <Button
                    variant="text"
                    sx={{
                      color: "#000",
                      "&:hover": { color: "#ff0000" },
                    }}
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => handleQuestionDelete(i)}
                  >
                    DELETE
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ))}

          <hr />

          <Grid
            display={"flex"}
            flexDirection={"column"}
            // sx={{ "& button": { m: 1 } }}
            className={styles.navBar}
            p={3}
          >
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "#FF5C00",
                border: "1px solid #FF5C00",
                "&:hover": { borderColor: "#d95000", color: "#d95000" },
                px: 2,
              }}
              startIcon={<AddIcon />}
              onClick={handleAddQuestion}
            >
              Add Question
            </Button>
          </Grid>
        </Paper>
      </form>
      {/* <App /> */}
    </>
  );
}
