package com.sneakx.common.response;

import java.util.function.Function;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class PageResponseMapper {

        public <T, R> PageResponse<R> map(
                        Page<T> page,
                        Function<T, R> mapper) {

                return new PageResponse<>(
                                page.getContent()
                                                .stream()
                                                .map(mapper)
                                                .toList(),
                                page.getNumber(),
                                page.getSize(),
                                page.getTotalElements(),
                                page.getTotalPages(),
                                page.isFirst(),
                                page.isLast());
        }
}