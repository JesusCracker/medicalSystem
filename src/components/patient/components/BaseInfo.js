import React, {PureComponent} from "react";
import style from "./Maternity.less";
import {Flex, InputItem, Picker, List, Button, Toast} from "antd-mobile";
import {createForm} from 'rc-form';
import {connect} from "dva";
import {withRouter} from "dva/router";
import moment from "moment";

class BaseInfo extends PureComponent {
  state = {
    area: [],
    temp: []
  }

  IDCardIcon = ({
                width = "200",
                height = "200",
                fill = "black"
              }) => (
    <svg t="1609984900415" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
         p-id="10091" width={width} height={height}>
      <path
        d="M160 192C107.36 192 64 235.36 64 288v448c0 52.64 43.36 96 96 96h704c52.64 0 96-43.36 96-96V288c0-52.64-43.36-96-96-96z m0 64h704c18.112 0 32 13.888 32 32v448c0 18.112-13.888 32-32 32H160c-18.112 0-32-13.888-32-32V288c0-18.112 13.888-32 32-32z m192 64c-70.4 0-128 57.6-128 128 0 35.616 15.264 67.744 39.008 91.008A161.152 161.152 0 0 0 192 672h64c0-53.376 42.624-96 96-96s96 42.624 96 96h64a161.152 161.152 0 0 0-71.008-132.992C464.736 515.744 480 483.648 480 448c0-70.4-57.6-128-128-128z m224 32v64h256v-64z m-224 32c35.744 0 64 28.256 64 64s-28.256 64-64 64-64-28.256-64-64 28.256-64 64-64z m224 96v64h256v-64z m0 128v64h160v-64z"
        p-id="10092" fill={fill}/>
    </svg>
  )


  // 上传身份证图片
  async getIDCardInfo(e) {
    const {dispatch, form} = this.props;
    Toast.loading('请稍等...', 0, true)
    // 选择的文件对象(file里只包含图片的体积，不包含图片的尺寸)
    let file = e.target.files[0];
    // 选择的文件是图片
    if (file.type.indexOf("image") === 0) {
      // 压缩图片需要的一些元素和对象
      let reader = new FileReader(),
        //创建一个img对象
        img = new Image();

      reader.readAsDataURL(file);
      // 文件base64化，以便获知图片原始尺寸
      reader.onload = function (e) {
        img.src = e.currentTarget.result;
      };

      // base64地址图片加载完毕后执行
      img.onload = function () {
        // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        // 图片原始尺寸
        let originWidth = this.width;
        let originHeight = this.height;

        // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
        let maxWidth = 600,
          maxHeight = 600;
        // 目标尺寸
        let targetWidth = originWidth,
          targetHeight = originHeight;
        // 图片尺寸超过300x300的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/

        //压缩后的图片转base64 url
        /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
         * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
        let newUrl = canvas.toDataURL('image/jpeg', 1);//base64 格式
        dispatch({
          type: 'historyCollection/postIDCard',
          payload: {
            picBase64Str: newUrl
          }
        }).then(res => {
          Toast.hide()
          if (res) {
            const {info} = JSON.parse(res.idCardInfo)
            const nowTime = moment();
            const birth = moment(info.year + '-' + info.month + '-' + info.day)
            form.setFieldsValue({
              idCard: info.number,
              name: info.name,
              age: nowTime.diff(birth, 'years'),
              nativePlace: info.address
            })
            Toast.info('请确认信息是否正确！', 3)
          } else {
            Toast.fail('身份证解析失败', 1)
          }
        })
      }
    } else {
      Toast.fail('请上传身份证图片', 3, true)
    }
  }

  async getProvinceList() {
    const {dispatch} = this.props;
    // 获取省列表
    await dispatch({
      type: 'historyCollection/getProvinceList'
    })
  }

  async getCityList(provinceCode) {
    const {dispatch} = this.props;
    // 获取市列表
    const {provinceList = [{}]} = this.props.historyCollection;
    await dispatch({
      type: 'historyCollection/getCityList',
      payload: {
        provinceCode: provinceCode || provinceList[0].value
      }
    })
  }

  async getCountyList(cityCode) {
    const {dispatch} = this.props;
    // 获取区/县列表
    const {cityList = [{}]} = this.props.historyCollection;
    await dispatch({
      type: 'historyCollection/getCountyList',
      payload: {
        cityCode: cityCode || cityList[0].value
      }
    })
  }

  handleChange(val) {
    const {form, dispatch} = this.props;
    const d = [...this.state.area];
    const asyncValue = [...val];
    d.forEach(province => {
      if (val[0] === province.value) {
        if (!province.children) {
          // 获取市列表
          dispatch({
            type: 'historyCollection/getCityList',
            payload: {
              provinceCode: province.value
            }
          }).then(cities => {
            province.children = cities.data.map(city => {
              return {
                value: city.cityCode,
                label: city.cityName
              }
            });
            asyncValue.push(province.children[0].value)
            dispatch({
              type: 'historyCollection/getCountyList',
              payload: {
                cityCode: province.children[0].value
              }
            }).then(result => {
              province.children[0].children = result.data.map(county => {
                return {
                  value: county.countyCode,
                  label: county.countyName
                }
              })
              asyncValue.push(province.children[0].children[0].value)
              form.setFieldsValue({
                areaCodes: [...asyncValue]
              });
              this.setState({
                temp: form.getFieldValue('areaCodes')
              })
            })
          })
        } else {
          this.setState({
            temp: val
          })
          province.children.forEach(i => {
            if (val[1] === i.value) {
              if (!i.children) {
                dispatch({
                  type: 'historyCollection/getCountyList',
                  payload: {
                    cityCode: i.value
                  }
                }).then(result => {
                  i.children = result.data.map(county => {
                    return {
                      value: county.countyCode,
                      label: county.countyName
                    }
                  })
                  asyncValue.push(i.children[0].value)
                  form.setFieldsValue({
                    areaCodes: [...asyncValue]
                  });
                  this.setState({
                    temp: form.getFieldValue('areaCodes')
                  })
                })
              } else {
                this.setState({
                  temp: val
                })
              }
            }
          })
        }
      }
    })
    form.setFieldsValue({
      areaCodes: asyncValue
    });
  }

  async componentDidMount() {
    const {location, dispatch, form} = this.props;
    await this.getProvinceList();
    if (location.state && location.state.id) {
      dispatch({
        type: 'historyCollection/getPatientHistoryDetail',
        payload: {
          id: location.state.id
        }
      }).then(res => {
        if (res.data) {
          const {idCard, name, age, nativePlace, address, mobile, familyMobile, provinceCode, cityCode, countyCode} = res.data;
          form.setFieldsValue({
            idCard, name, age, nativePlace, address, mobile, familyMobile,
          });
          // areaCode: [provinceCode, cityCode, countyCode]
          const {provinceList = [{}]} = this.props.historyCollection;
          // 获取市列表
          dispatch({
            type: 'historyCollection/getCityList',
            payload: {
              provinceCode: provinceCode || provinceList[0].value
            }
          }).then(_ => {
            // 获取区/县列表
            const {cityList = [{}]} = this.props.historyCollection;
            dispatch({
              type: 'historyCollection/getCountyList',
              payload: {
                cityCode: cityCode || cityList[0].value
              }
            }).then(_ => {
              // 组装省市区数据
              const {provinceList = [{}], cityList = [{}], countyList = [{}]} = this.props.historyCollection
              provinceList.forEach(province => {
                if (province.value === (provinceCode || provinceList[0].value)) {
                  province.children = cityList;
                  cityList.forEach(city => {
                    if (city.value === (cityCode || cityList[0].value)) {
                      city.children = countyList
                    }
                  })
                }
              })
              this.setState({
                area: [
                  ...provinceList
                ]
              }, () => {
                form.setFieldsValue({
                  areaCodes: [provinceCode, cityCode, countyCode]
                })
              })
            })
          })
        }
      })
    } else {
      await this.getCityList();
      await this.getCountyList();
      const {provinceList = [{}], cityList = [{}], countyList = [{}]} = this.props.historyCollection
      cityList[0].children = countyList;
      provinceList[0].children = cityList;
      form.setFieldsValue({
        areaCodes: [provinceList[0].value, cityList[0].value, countyList[0].value]
      });
      this.setState({
        area: [
          ...provinceList
        ]
      })
    }
  }

  handleSave = (type) => {
    const {form, historyCollection, location, dispatch, history} = this.props;
    const {provinceList} = historyCollection;
    const {getFieldsValue, validateFields} = form;
    validateFields({ force: true }, (error) => {
      if (!error) {
        const {areaCodes, ...params} = getFieldsValue(['idCard', 'name', 'age', 'nativePlace', 'address', 'mobile', 'familyMobile', 'areaCodes']);
        provinceList.forEach(province => {
          if (province.value === areaCodes[0]) {
            params.provinceCode = province.value;
            params.provinceName = province.label;
            province.children.forEach(city => {
              if (city.value === areaCodes[1]) {
                params.cityCode = city.value;
                params.cityName = city.label;
                city.children.forEach(county => {
                  if (county.value === areaCodes[2]) {
                    params.countyCode = county.value;
                    params.countyName = county.label;
                  }
                })
              }
            })
          }
        })
        if (location.state && location.state.id) {
          params.id = location.state.id
        }
        params.userId = JSON.parse(localStorage.getItem('patientInfo')).id;
        params.step = 1;
        dispatch({
          type: 'historyCollection/postPatientHistory',
          payload: params
        }).then(res => {
          if (res && res.status === 1) {
            if (type === 'close') {
              history.push('/patientRegister')
            } else {
              history.push('/historyCollection/workAndLife', {id: location.state.id})
            }
          }
        })
      } else {
        Toast.info('请确认表单填写是否正确');
      }
    })

  }

  render() {
    const {form, loading} = this.props
    const {getFieldProps} = form;

    return (
      <div className={style.patientFormContent}>
        <div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>身份信息：</Flex.Item>
          </Flex>
          <div>
            <div style={{position: "relative"}}>
              <InputItem
                {...getFieldProps('idCard',{
                  rules: [{
                    required: true
                  },{
                    min: 18, max: 18
                  }]
                })}
                placeholder="请输入号码或上传身份证图片"
              >
                <span style={{ color: 'red' }}>*</span>身份证号
              </InputItem>
              <div style={{position: "absolute", zIndex: "999", top: "0", right: "5px"}}>
                {this.IDCardIcon({width: '44px', height: '44px', fill: 'rgba(204,204,204,1)'})}
                <input type='file' accept='image/*' onChange={(e) => this.getIDCardInfo(e)} style={{
                  opacity: "0",
                  position: "absolute",
                  right: "0",
                  top: "0",
                  height: "44px",
                  width: "44px",
                  overflow: "hidden"
                }}/>
              </div>
            </div>
            <InputItem
              {...getFieldProps('name', {
                rules: [{
                  required: true
                }]
              })}
              placeholder="请输入姓名"
            >
              <span style={{ color: 'red' }}>*</span>姓名
            </InputItem>
            <InputItem
              {...getFieldProps('age', {
                rules: [{
                  required: true
                }]
              })}
              type="number"
              placeholder="请输入周岁"
            >
              <span style={{ color: 'red' }}>*</span>年龄
            </InputItem>
            <InputItem
              {...getFieldProps('nativePlace', {
                rules: [{
                  required: true
                }]
              })}
              placeholder="请输入省市县镇村"
            >
              <span style={{ color: 'red' }}>*</span>籍贯
            </InputItem>
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>居住地址：</Flex.Item>
          </Flex>
          <div>
            <Picker
              extra="请选择"
              data={this.state.area}
              title="居住地"
              {...getFieldProps('areaCodes')}
              loading={loading['historyCollection/saveCityList']}
              onPickerChange={arr => this.handleChange(arr)}
              onOk={_ => {
                form.setFieldsValue({
                  areaCodes: [...this.state.temp]
                })
              }}
            >
              {/*
                省  provinceName  provinceCode
                市  cityName  cityCode
                区  countyName  countyCode
              */}
              <List.Item>省市区</List.Item>
            </Picker>
            <InputItem
              {...getFieldProps('address')}
              placeholder="请输入"
            >
              街号
            </InputItem>
          </div>
          <Flex className={style.inputTitle}>
            <Flex.Item className={style.inputTitleLeft}>联系方式：</Flex.Item>
          </Flex>
          <div>
            <InputItem
              {...getFieldProps('mobile', {
                rules: [{
                  required: true, message: '请输入手机号码'
                }, {
                  min: 11, message: '手机号不足11位'
                }, {
                  max: 12, message: '手机号超过11位'
                }
                ]
              })}
              placeholder="请输入手机号"
            >
              <span style={{ color: 'red' }}>*</span>本人手机
            </InputItem>
            <InputItem
              {...getFieldProps('familyMobile')}
              placeholder="请输入"
            >
              家属电话
            </InputItem>
          </div>
        </div>
        <div className={style.btnContent}>
          <Button className={style.doctorBtn1} onClick={() => this.handleSave('close')}>保存后关闭</Button>
          <Button className={style.doctorBtn2} onClick={() => this.handleSave()}>保存，并继续填写</Button>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {
    ...state,
    historyCollection: state.historyCollection
  }
})(createForm()(withRouter(BaseInfo)));
