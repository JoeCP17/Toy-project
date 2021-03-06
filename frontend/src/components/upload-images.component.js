import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';

import UploadService from "../services/upload-files.service";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    

    this.state = {
      currentFile: "",
      previewImage: "",
      progress: 0,

      message: "",
      isError: false,
      imageInfos: [],
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        imageInfos: response.data,
      });
    }).catch((err)=> {
      console.log(err)
      console.log(err.data)
    })
  }

   selectFile(event) {
     this.setState({
       currentFile: event.target.files[0],
       previewImage: URL.createObjectURL(event.target.files[0]),
       progress: 0,
       message: ""
     });
  }

  upload() {
    this.setState({
      progress: 0
    });

    UploadService.upload(this.state.currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.json().message,
          isError: false
        });
       
      }).catch((res) => {
        console.log(res)
        console.log(res.json())
      })
      .then((file) => {
        this.setState({
          imageInfos: file.json(),
        });
      })

      .catch((err) => {
        this.setState({
          progress: 0,
          message: "이미지 업로드 성공!",
          currentFile: undefined,
          isError: true
        });
      });
  }


  render() {
    const {
      currentFile,
      previewImage,
      progress,
      message,
      imageInfos,
      isError
    } = this.state;
    
    return (
      <div className="mg20">
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            onChange={this.selectFile} />
          <Button
            className="btn-choose"
            variant="outlined"
            component="span" >
             이미지 선택
          </Button>
        </label>
        <div className="file-name">
        {currentFile ? currentFile.name : null}
        </div>
        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          disabled={!currentFile}
          onClick={this.upload}>
          업로드
        </Button>

        {currentFile && (
          <Box className="my20" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
            </Box>
          </Box>)
        }

        {previewImage && (
          <div>
            <img className="preview my20" src={previewImage} alt="" />
          </div>
        )}

        {message && (
          <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
            {message}
          </Typography>
        )}

    <Typography variant="h6" className="list-header">
              결과 확인
    </Typography>

      </div >
    );
  }
}
