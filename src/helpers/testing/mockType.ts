export type IDataMock<T> = {
    [P in keyof T]?: IDataMock<T[P]>
}

export default function Mock<T>(instance: IDataMock<T>): T {
    return instance as T
}
