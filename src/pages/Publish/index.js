import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { useForm } from 'antd/lib/form/Form';
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import { useEffect, useState } from 'react'
import { createArticleAPI, getArticleAPI, updateArticleAPI } from '@/apis/article'
import { useChannels } from '@/hooks/useChannels'

const { Option } = Select

const Publish = () => {
    // get chnls drag down list
    const { chnlList } = useChannels()
    const [imageList, setImageList] = useState([])
    const [coverNumber, setCoverNumber] = useState(0)

    // submit
    const [form] = useForm()

    const onFinish = (formData) => {
        if (imageList.length !== coverNumber) return message.warning('图片数量与上传数量不匹配')
        // destruct formData
        const { title, content, channel_id } = formData
        // consctruct req data
        const reqData = {
            title,
            content,
            channel_id,
            cover: {
                type: coverNumber,
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    } else {
                        return item.url
                    } 
                }
            )
            }
        }

        if (articleId) {
            updateArticleAPI({ ...reqData, id:articleId })
        } else {
            createArticleAPI(reqData)
        }

        form.resetFields()
        setImageList([])
    }

    // upload cover
    const onChange = (value) => {
        setImageList(value.fileList)
    }

    // choose to render upload lot
    const onTypechange = (e) => {
        console.log('Switch image number to : ', e.target.value)
        setCoverNumber(Number(e.target.value))
    }

    // fill in for edit 
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    
    useEffect(() => {
        async function getArticle() {
            const res = await getArticleAPI(articleId)
            const data = res.data
            const { cover } = data
            form.setFieldsValue({
                ...data,
                type: cover.type
            })
            setCoverNumber(cover.type)
            setImageList(cover.images)
        }

        if (articleId) { getArticle() }
    }, [articleId, form])

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: `${articleId ? '编辑':'创建'}文章` },
                    ]}
                    />
                }
            >
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {chnlList.map(item =>
                                <Option
                                    key={item.id}
                                    value={item.id}>
                                    {item.name}
                                </Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="封面">
                        <Form.Item
                            name="type"
                            onChange={onTypechange}
                        >
                            <Radio.Group>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {
                            coverNumber > 0 &&
                                <Upload
                                    listType="picture-card"
                                    showUploadList
                                    action={'http://geek.itheima.net/v1_0/upload'}
                                    name='image'
                                    onChange={onChange}
                                    maxCount={coverNumber}
                                    fileList={imageList}
                                >
                                    <div style={{ marginTop: 8 }}>
                                        <PlusOutlined />
                                    </div>
                                </Upload>
                        }    
                    </Form.Item>

                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish