<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <card>
            <template slot="header">
              <h4 class="card-title">1. Openstack Service</h4>
              <p class="card-category">Compute, Network, Storage를 사용자 UI로 사용할 수 있습니다.</p>
            </template>
            <div>
              <img style="width:100%" src="static/img/openstackservice.png" alt="Openstack Service Image" />
            </div>
          </card>
        </div>

        <div class="col-md-4">
          <card>
            <template slot="header">
              <h4 class="card-title">2. Use multiple languages easily</h4>
              <p class="card-category">Openstack과 Docker를 이용하여 여러 언어의 실습환경을 제공합니다.</p>
            </template>
            <div>
              <img style="width:100%" src="static/img/uselanguage.png" alt="Openstack Service Image" />
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <card>
            <template slot="header">
              <h4 class="card-title">3. Using method</h4>
              <p class="card-category">강의자가 강의실을 만들면 수강자가 접속할 수 있습니다.</p>
            </template>
            <div>
              <img style="width:100%" src="static/img/usemethod.png" alt="Openstack Service Image" />
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import LTable from 'src/components/UIComponents/Table.vue'
  import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'

  export default {
    components: {
      Checkbox,
      Card,
      LTable,
      ChartCard,
      StatsCard
    },
    data () {
      return {
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        pieChart: {
          data: {
            labels: ['40%', '20%', '40%'],
            series: [40, 20, 40]
          }
        },
        lineChart: {
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 492, 554, 586, 698, 695],
              [67, 152, 143, 240, 287, 335, 435, 437],
              [23, 113, 67, 108, 190, 239, 307, 308]
            ]
          },
          options: {
            low: 0,
            high: 800,
            showArea: false,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 50
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        barChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
              [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        tableData: {
          data: [
            {title: 'Sign contract for "What are conference organizers afraid of?"', checked: false},
            {title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: true},
            {
              title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              checked: true
            },
            {title: 'Create 4 Invisible User Experiences you Never Knew About', checked: false},
            {title: 'Read "Following makes Medium better"', checked: false},
            {title: 'Unfollow 5 enemies from twitter', checked: false}
          ]
        }
      }
    }
  }
</script>
<style>

</style>
