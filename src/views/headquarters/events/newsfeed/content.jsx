import React, { Component } from 'react';
import Box from '../../../../components/utility/box';
import ContentHolder from '../../../../components/utility/contentHolder';
import LayoutContentWrapper from '../../../../components/utility/layoutWrapper';
import { MDBIframe } from "mdbreact";
import axios from 'axios';

export default class Content extends Component {
    constructor() {
        super();
        this.state = {
            url: localStorage.getItem('url')
        };
    }

    displayData = () => {
        return this.props.datas.map(data => {
            let attachment;
            if (data.file_type === 'image') {
                attachment = <img
                    width="60%"
                    height="auto"
                    src={`${axios.defaults.baseURL}storage/newsfeed/${this.state.url}/${data.author}/${data.attachment}`}
                    onError={
                        (e) => {
                            e.target.onerror = null;
                            e.target.src = `${axios.defaults.baseURL}storage/newsfeed/404.jpg`
                        }}
                    alt={data.title}
                />
            } else if (data.file_type === 'url') {
                attachment = <MDBIframe title={data.title} src={`https://www.youtube.com/embed/${data.attachment}`} />
            } else {
                attachment = null;
            }
            return (
                <Box
                    key={`${data.title}${data.id}`}
                    title={
                        <span className="h3 font-weight-normal">
                            {data.authorname}
                        </span>
                    }
                    subtitle={
                        <span>
                            For:&nbsp;
                            <em>
                                {data.category === 'campus' ?
                                    'Whole Campus'
                                    :
                                    `Grade(s) ${data.certain.join(', ')}`
                                }
                            </em>
                        </span>
                    }
                >
                    <h3 className="font-weight-bold mt-2">{data.title}</h3>
                    <h6 className="font-weight-normal">{data.subtitle}</h6>
                    <ContentHolder>
                        <span>{data.announcement}</span>
                        <div className="w-100 text-center">
                            {attachment}
                        </div>
                    </ContentHolder>
                </Box>
            )
        })
    }

    render() {
        return (
            <LayoutContentWrapper>
                {this.displayData()}
            </LayoutContentWrapper>
        );
    }
}