import React from "react";

export default class Plot extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return <canvas id="canvas" onClick={this.handleClick} width='500' height='500'/>
    }

    componentDidMount() {
        this.repaint()
    }

    componentDidUpdate() {
        this.repaint()
    }

    repaint() {
        if (this.props.radius < 0)
            this.paintPlot(true);
        else
            this.paintPlot(false);
        if (this.props.points.length !== 0 && !isNaN(this.props.radius))
            this.addDots(this.props.radius, this.props.points);
    }

    handleClick(event) {

        const width = parseInt(getComputedStyle(document.getElementById("canvas")).width);
        const height = parseInt(getComputedStyle(document.getElementById("canvas")).height);
        const radius = this.props.radius;
        if (radius == null) this.props.setError('Укажите радиус!');
        else {
            this.props.setError('');
            const x = event.pageX - (document.getElementById("canvas").getBoundingClientRect().left + pageXOffset);
            const y = event.pageY - (document.getElementById("canvas").getBoundingClientRect().top + pageYOffset);

            const cordX = (x - width / 2) * Number(radius) / Math.round(width / 3);
            const cordY = (height / 2 - y) * Number(radius) / Math.round(height / 3);

            this.props.addPoint({'x': cordX, 'y': cordY, 'r': radius}, this.props.token, this.props.username);
        }
    }

    paintPlot(negative) {
        const blue = "#45688E";
        const red = "red";
        const ctx = document.getElementById("canvas").getContext("2d");
        const width = document.getElementById("canvas").getAttribute("width");
        const height = document.getElementById("canvas").getAttribute("height");
        let rad = height / 40;
        let rad2 = height / 80;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, Number(width), Number(height)); //do white canvas
        ctx.fillStyle = blue;
        ctx.fillRect(width / 2, height / 2, 1 / 6 * width, 2 / 6 * height);
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 1 / 6 * height, 3 / 2 * Math.PI, 2 * Math.PI);
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(width / 2, 2 / 6 * height);
        ctx.lineTo(4 / 6 * width, height / 2);
        ctx.lineTo(width / 2, height / 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(1 / 6 * width, height / 2);
        ctx.lineTo(width / 2, 4 / 6 * height);
        ctx.lineTo(width / 2, height / 2);
        ctx.fill();
        ctx.beginPath();
        if (negative) {
            canvas_arrow(ctx, width / 2, rad, width / 2, height - rad);
            canvas_arrow(ctx, width - rad, height / 2, rad, height / 2);
            ctx.strokeText("X", rad, height / 2 - rad / 2);
            ctx.strokeText("Y", width / 2 + rad / 2, Number(height) - rad);
        } else {
            canvas_arrow(ctx, width / 2, height - rad, width / 2, rad);
            canvas_arrow(ctx, rad, height / 2, width - rad, height / 2);
            ctx.strokeText("X", Number(width) - rad, height / 2 - rad / 2);
            ctx.strokeText("Y", width / 2 + rad / 2, rad);
        }
        addMark("-R", width / 2, 5 / 6 * height);
        addMark("-R/2", width / 2, 4 / 6 * height);
        addMark("R/2", width / 2, 2 / 6 * height);
        addMark("R", width / 2, 1 / 6 * height);
        addMark("R/2", 4 / 6 * width, height / 2);
        addMark("R", 5 / 6 * width, height / 2);
        addMark("-R/2", 2 / 6 * width, height / 2);
        addMark("-R", 1 / 6 * width, height / 2);
        ctx.stroke();

        function addMark(label, x, y) {
            if (x === width / 2) {
                ctx.moveTo(x - rad2, y);
                ctx.lineTo(x + rad2, y);
                ctx.strokeText(label, x + rad, y);
            }
            if (y === height / 2) {
                ctx.moveTo(x, y - rad2);
                ctx.lineTo(x, y + rad2);
                ctx.strokeText(label, x, y - rad);
            }
        }

        function canvas_arrow(context, fromx, fromy, tox, toy) {
            let headlen = 10; // length of head in pixels
            let dx = tox - fromx;
            let dy = toy - fromy;
            let angle = Math.atan2(dy, dx);
            context.moveTo(fromx, fromy);
            context.lineTo(tox, toy);
            context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
            context.moveTo(tox, toy);
            context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        }
    }

    addDots(r, history) {
        const ctx = document.getElementById("canvas").getContext("2d");
        const width = document.getElementById("canvas").getAttribute("width");
        const height = document.getElementById("canvas").getAttribute("height");
        const blue = "#45688E";
        const red = "red";
        Array.prototype.forEach.call(history, function (point) {
            let x = width / 2 + point['x'] * Math.round(width / 3) / Number(r);
            let y = height / 2 - point['y'] * Math.round(height / 3) / Number(r);
            ctx.fillStyle = setColor(point, r);
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        });

        function setColor(point, r) {
            const blue = "#45688E";
            const red = "red";
            const x = point['x'];
            const y = point['y'];
            if (r >= 0) {
                if (x < 0) {
                    if (y > 0)
                        return blue;
                    else {
                        if (y < -0.5 * x - r / 2)
                            return blue;
                        else
                            return red;
                    }
                } else {
                    if (y > 0) {
                        if (Math.pow(x, 2) + Math.pow(y, 2) > Math.pow(r / 2, 2))
                            return blue;
                        else
                            return red;
                    } else {
                        if (x > r / 2 || y < -r)
                            return blue;
                        else
                            return red;
                    }
                }
            }
            else {
                if (x > 0) {
                    if (y < 0)
                        return blue;
                    else {
                        if (y > -0.5 * x - r / 2)
                            return blue;
                        else
                            return red;
                    }
                } else {
                    if (y < 0) {
                        if (Math.pow(x, 2) + Math.pow(y, 2) > Math.pow(r / 2, 2))
                            return blue;
                        else
                            return red;
                    } else {
                        if (x > r / 2 && y < -r)
                            return red;
                        else
                            return blue;
                    }
                }
            }
        }
    }
}