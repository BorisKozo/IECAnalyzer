// import { Genome } from './neatjs/genome';
// import { INode } from './neatjs/node';
// import * as d3 from 'd3';

// type DrawConnection = {
//   source: number;
//   target: number;
//   weight: number;
//   enabled: boolean;
// };
// export function drawGenome(genome: Genome, width: number = 400, height: number = 400, container: string = 'svgContainer') {
//   //Draw the genome to a svg
//   var element = document.getElementById(this.id);
//   if (element) element.parentNode.removeChild(element);
//   var svg = d3.select('body').append('svg').attr('width', width).attr('height', height).attr('id', genome.id);

//   var force = d3.forceSimulation().force('asd').gravity(0.05).distance(100).charge(-100).size([width, height]);

//   const connections: DrawConnection[] = [];
//   genome.connections.forEach((conn) => {
//     connections.push({
//       source: genome.getNode(conn.getFromNode().getNumber()),
//       target: genome.getNode(conn.getToNode().getNumber()),
//       weight: conn.getWeight(),
//       enabled: conn.isEnabled(),
//     });
//   });

//   let nodes:INode[] = [];
//   genome.nodes.forEach((originalNode) => {
//     let node = originalNode.clone();
//     if (node.layer == 0) {
//       node.fixed = true;
//       node.y = height - height * 0.2;
//       node.x = (width / this.inputs) * node.number + width / this.inputs / 2;
//     }

//     if (node.output) {
//       node.fixed = true;
//       node.y = height * 0.2;
//       node.x = (width / this.outputs) * (node.number - this.inputs) + width / this.outputs / 2;
//     }

//     nodes.push(node);
//   });

//   force.nodes(nodes).links(connections).start();

//   var link = svg
//     .selectAll('.link')
//     .data(connections)
//     .enter()
//     .append('line')
//     .attr('class', 'link')
//     .style('stroke-width', function (d) {
//       return d.enabled ? (d.weight > 0 ? 0.3 + d.weight : 0.3 + d.weight * -1) : 0;
//     })
//     .style('stroke', function (d) {
//       return d.weight > 0 ? '#0f0' : '#f00';
//     });

//   var node = svg.selectAll('.node').data(nodes).enter().append('g').attr('class', 'node').call(force.drag);

//   node
//     .append('circle')
//     .attr('r', '5')
//     .attr('fill', function (d) {
//       return d.layer == 0 ? '#00f' : d.output ? '#f00' : '#000';
//     });

//   node
//     .append('text')
//     .attr('dx', 12)
//     .attr('dy', '.35em')
//     .text(function (d) {
//       return d.number + (d.layer > 0 ? '(' + activationsNames[d.activationFunction] + ')' : null);
//     });

//   force.on('tick', function () {
//     link
//       .attr('x1', function (d) {
//         return d.source.x;
//       })
//       .attr('y1', function (d) {
//         return d.source.y;
//       })
//       .attr('x2', function (d) {
//         return d.target.x;
//       })
//       .attr('y2', function (d) {
//         return d.target.y;
//       });

//     node.attr('transform', function (d) {
//       return 'translate(' + d.x + ',' + d.y + ')';
//     });
//   });

//   var element = document.getElementById(this.id);
//   document.getElementById(container).append(element);
// }