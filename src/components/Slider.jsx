import React, { useState, useEffect } from 'react';
import Button from './Button';

export default function Slider({ images }) {

    return (
        <div class="swiper">
            <div class="swiper-wrapper">
                {
                    images.map((slide, index) => <div key={index} class="swiper-slide"><img src={slide} alt="" /> </div>)
                }
            </div>

            <div class="swiper-pagination"></div>

            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

            <div class="swiper-scrollbar"></div>
        </div>

    )


};