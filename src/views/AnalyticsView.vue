<script>
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';

export default {
	name: 'HelloWorld',
	mounted() {
		let root = am5.Root.new(this.$refs.chartdiv);
		root.dateFormatter.setAll({
			dateFields: ['valueX'],
		});

		// hide logo amcharts
		root._logo.dispose();

		root.setThemes([am5themes_Animated.new(root)]);

		let chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				hideCredits: true,
				panY: false,
				panX: false,
				layout: root.verticalLayout,
			})
		);

		chart.children.unshift(
			am5.Label.new(root, {
				text: 'Аналитика по визитам',
				fontSize: 25,
				fontWeight: '500',
				textAlign: 'center',
				x: am5.percent(50),
				centerX: am5.percent(50),
				paddingTop: 0,
				paddingBottom: 15,
			})
		);

		chart.set('cursor', am5xy.XYCursor.new(root, {}));

		let data = [
			{ date: '2020-07-01', visits: 213 },
			{ date: '2020-07-02', visits: 249 },
			{ date: '2020-07-03', visits: 179 },
			{ date: '2020-07-04', visits: 170 },
			{ date: '2020-07-05', visits: 184 },
			{ date: '2020-07-06', visits: 202 },
			{ date: '2020-07-07', visits: 198 },
			{ date: '2020-07-08', visits: 168 },
			{ date: '2020-07-09', visits: 176 },
			{ date: '2020-07-10', visits: 171 },
			{ date: '2020-07-11', visits: 190 },
			{ date: '2020-07-12', visits: 154 },
			{ date: '2020-07-13', visits: 246 },
			{ date: '2020-07-14', visits: 250 },
			{ date: '2020-07-15', visits: 227 },
			{ date: '2020-07-16', visits: 140 },
			{ date: '2020-07-17', visits: 170 },
			{ date: '2020-07-18', visits: 125 },
			{ date: '2020-07-19', visits: 106 },
			{ date: '2020-07-20', visits: 207 },
			{ date: '2020-07-21', visits: 222 },
			{ date: '2020-07-22', visits: 198 },
			{ date: '2020-07-23', visits: 204 },
			{ date: '2020-07-24', visits: 213 },
			{ date: '2020-07-25', visits: 145 },
			{ date: '2020-07-26', visits: 166 },
			{ date: '2020-07-27', visits: 163 },
			{ date: '2020-07-28', visits: 135 },
			{ date: '2020-07-29', visits: 45 },
		];

		let yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				renderer: am5xy.AxisRendererY.new(root, {}),
			})
		);

		let xAxis = chart.xAxes.push(
			am5xy.DateAxis.new(root, {
				renderer: am5xy.AxisRendererX.new(root, {}),
				baseInterval: {
					timeUnit: 'day',
					count: 1,
				},
				color: '#ff0000',
			})
		);

		xAxis.data.setAll(data);

		let series = chart.series.push(
			am5xy.LineSeries.new(root, {
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: 'visits',
				valueXField: 'date',
				tooltip: am5.Tooltip.new(root, {
					labelText: '{valueX}: {valueY}',
				}),
			})
		);

		series.strokes.template.setAll({
			strokeWidth: 3,
		});

		series.data.processor = am5.DataProcessor.new(root, {
			numericFields: ['visits'],
			dateFields: ['date'],
			dateFormat: 'yyyy-MM-dd',
		});

		series.bullets.push(function () {
			return am5.Bullet.new(root, {
				sprite: am5.Circle.new(root, {
					radius: 5,
					fill: series.get('fill'),
				}),
			});
		});

		series.data.setAll(data);

		let legend = chart.children.push(am5.Legend.new(root, {}));
		legend.data.setAll(chart.series.values);

		this.root = root;
	},
};
</script>

<template>
	<div class="analytic">
		<h1 class="title">Аналитика</h1>
		<div class="hello" ref="chartdiv"></div>
	</div>
</template>

<style scoped>
.analytic {
	width: 100%;
	height: 100dvh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.title {
	font-family: Helvetica, sans-serif;
	color: #000;
}
.hello {
	width: 90%;
	height: 500px;
}
</style>
