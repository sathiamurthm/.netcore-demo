﻿export interface Type<T> extends Function {
    new(...args: any[]): T;
}

export class DomainConverter {
    static toObj<T>(domain: Type<T>, dto: any) {
        const instance = Object.create(domain.prototype);
        instance.state = dto;
        return instance as T;
    }

    static toJson<T>(domain: any) {
        return domain.state as T;
    }
}