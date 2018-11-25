// 在地图上点击后，找到最近的点
window.find_site = function(positions, x, y){
    // 寻找距离鼠标点击处最近的站点，以点击点到站点的直线距离最小作为判断依据
    var min_dis = Infinity;
    var nearest_site = '';
    for(var name in positions){
        var dis = Math.pow(positions[name].x - x, 2) + Math.pow(positions[name].y - y, 2)
        if(dis < min_dis){
            min_dis = dis;
            nearest_site = name;
        }
    }
    return nearest_site;
}