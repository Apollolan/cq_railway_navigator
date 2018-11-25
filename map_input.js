

// 去重之后的所有站点的数组
// var sites_list = [];
// for (var line_name in lines) {
//     for (var k in lines[line_name]) {
//         if (sites_list.indexOf(lines[line_name][k]) < 0) {
//             sites_list.push(lines[line_name][k])
//         }
//     }
// }

// 看看重复的有多少
// var duplicate = {};
// for (var line_name in lines) {
//     for (var k in lines[line_name]) {
//         duplicate[lines[line_name][k]] = duplicate[lines[line_name][k]] ? duplicate[lines[line_name][k]] + 1 : 1;
//     }
// }

// 站点位置录入
// var $map = $('#map');
// var index = Object.keys(positions).length - 1;
// toastr.warning('下一个录入:' + sites_list[++index]);
// $map.click(function (e) {
//     if (index > sites_list - 1) {
//         toastr.success('已全部录入完毕');
//         return false;
//     }
//     positions[sites_list[index]] = {
//         x: e.offsetX,
//         y: e.offsetY
//     };
//     toastr.warning('下一个录入:' + sites_list[++index]);
// });
// console.log(positions)

// 构造一个完整的map_input对象用于输入算法公式计算
// window.map_input = {};
// for(var name in positions){
//     map_input[name] = {};
//     for(var other in positions){
//         if(name != other){
//             map_input[name][other] = Infinity; // 先设置成无穷大
//         }
//     }
// }
// // 先沿着每条轻轨线构造两个站点之间的路径长度
// for(var line_name in lines){
//     var line_sites = lines[line_name];
//     for(var i = 1; i < line_sites.length; i++){
//         var curr_site = line_sites[i];
//         var last_site = line_sites[i-1];
//         var dis = Math.sqrt(Math.pow(positions[curr_site].x - positions[last_site].x, 2) + Math.pow(positions[curr_site].y - positions[last_site].y, 2))
//         map_input[curr_site][last_site] = map_input[last_site][curr_site] = dis;
//     }
// }