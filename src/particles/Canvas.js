import React from "react";
import {Platform, View} from 'react-native';
import RAFManager from "raf-manager";
import {GCanvasView} from '@flyskywhy/react-native-gcanvas';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this._id = 0;
    this.size = { width: 0, height: 0 };
    this.canvas = null;
    this.state = {
      isLayouted: false,
    };
    this.style = {};
  }

  componentDidMount() {
    if (Platform.OS === 'web') {
      this.resize = this.resize.bind(this);
      window.addEventListener("resize", this.resize);
    }

    this.canvas && this.props.onCanvasDidMount && this.props.onCanvasDidMount(this.canvas);
  }

  initCanvas(canvas) {
    if (this.canvas) {
      return;
    }

    this.canvas = canvas;
    let width;
    let height;

    if (Platform.OS === 'web') {
      width = this.canvas.clientWidth;
      height = this.canvas.clientHeight;
    } else {
      width = this.canvas.width;
      height = this.canvas.height;
    }
    if (this.props.globalCompositeOperation) {
      const context = this.canvas.getContext("2d");
      context.globalCompositeOperation = this.props.globalCompositeOperation;
    }

    if (Platform.OS === 'web') {
      this.setCanvasSize(this.canvas);
      this.heartbeatDetectionCanvasSize(this.canvas);
    }
    this.props.onCanvasInited(this.canvas, width, height);
  }

  heartbeatDetectionCanvasSize(canvas) {
    this._id = setInterval(() => {
      if(this.canvas){
        const newHeight = this.canvas.clientHeight;
        if (newHeight !== this.size.height) {
          const { width, height } = this.setCanvasSize(canvas);
          this.props.onResize && this.props.onResize(width, height);
        }
      }
    }, 1000 / 10);
  }

  componentWillUnmount() {
    if (Platform.OS === 'web') {
      try{
        window.removeEventListener("resize", this.resize);
        clearInterval(this._id);
      }catch(e){}
    }
  }

  resize() {
    if (this.canvas) {
      const { width, height } = this.setCanvasSize(this.canvas);
      this.props.onResize && this.props.onResize(width, height);
    }
  }

  setCanvasSize(canvas) {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.size.width = width;
    this.size.height = height;
    canvas.width = width;
    canvas.height = height;
    return { width, height };
  }

  handleWaypointEnter() {
    RAFManager.start();
  }

  handleWaypointLeave() {
    RAFManager.stop();
  }

  getStyle() {
    let style = { width: "100%", height: "100%" };

    if (this.props.bg) {
      style = Object.assign(style, {
        position: "absolute",
        zIndex: -1,
        top: 0,
        left: 0
      });
    }
    return style;
  }

  handleMouseDown(e) {
    this.props.onMouseDown && this.props.onMouseDown(e);
  }

  _onLayout(event) {
    const {
      width,
      height,
    } = event.nativeEvent.layout;
    this.style = this.getStyle();
    this.style.width = width;
    this.style.height = height;

    this.setState({
      isLayouted: true,
    });
  }

  render() {
    if (Platform.OS === 'web') {
      return (
        <canvas
          ref={this.initCanvas.bind(this)}
          onMouseDown={this.handleMouseDown.bind(this)}
          style={this.getStyle()}
        />
      );
    } else {
      return (
        <View onLayout={this._onLayout.bind(this)} style={this.getStyle()}>
          {this.state.isLayouted === false ? null :
            <GCanvasView
              onCanvasCreate={this.initCanvas.bind(this)}
              onMouseDown={this.handleMouseDown.bind(this)}
              style={this.style}
            />
          }
        </View>
      );
    }
  }
}
