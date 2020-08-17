import { Bounds, GeoBounds, Positon } from "../../map";

/**
 * @description 故事类型
 */
export enum StoryType {
    Book = "book",
    Event = "event",
}

/**
 * @description 故事事件类型
 */
export enum StoryEventType {
    Text = "text",
    Picture = 'picture',
    PDF = "pdf",
    VIDEO = "video",
}

/**
 * @description 故事事件类型说明类
 */
export const StoryEventOptions = [
    { label: "文字", value: StoryEventType.Text },
    { label: "图片", value: StoryEventType.Picture },
    { label: "文档", value: StoryEventType.PDF },
    { label: "视频", value: StoryEventType.VIDEO },
];

/**
 * @description 故事
 */
export class Story {
    current: string = "";
    books: Array<StoryBook> = [];

    /**
     * @description 将故事对象封装包裹类
     * @param story 故事对象
     */
    static wrapper(story: any) {
        let storyObj;
        if (story)  {
            const { books, current } = story;
            storyObj = new Story(books);
            storyObj.current = current;
        } else {
            storyObj = new Story();
            storyObj.current = "";
        }

        return storyObj;
    }

    constructor(books?: Array<StoryBook>) {
        if (books) {
            this.books = books;
        }
    }

    /**
     * @description 返回当前的激活的书籍Book
     * @param id 查询键值
     */
    getCurrentBook(id?: string) {
        id = id || this.current;
        for (let i = 0; i < this.books.length; i++) {
            let book = this.books[i];
            if (id === book.key) {
                return book;
            }
            for (let j = 0; j < book.events.length; j++) {
                let event = book.events[j];
                if (event.key === id) {
                    return book;
                }
            }
        }
        return undefined;
    }

    /**
     * @description 返回当前激活的事件Book->Event
     * @param id 查询键值
     */
    getCurrentEvent(id?: string) {
        id = id || this.current;
        for (let i = 0; i < this.books.length; i++) {
            let book = this.books[i];
            for (let j = 0; j < book.events.length; j++) {
                let event = book.events[j];
                if (event.key === id) {
                    return event;
                }
            }
        }
        return undefined;
    }

    /**
     * @description 设置对应的当前的激活故事
     * @param current 当前激活书籍Book的键值
     */
    changeStoryCurrent(current: string) {
        this.current = current;
        return current;
    }

    /**
     * @description 查询对应的故事书籍
     * @param key 书籍的键值
     */
    getStoryBook(key: string) {
        if (!this.books) {
            return undefined;
        }
        for (let i = 0; i < this.books.length; i++) {
            let book = this.books[i];
            if (key === book.key) {
                return book;
            }
        }
        return undefined;
    }
    /**
     * @description 向地图文档新增故事书籍
     * @param book 添加书籍
     * @param doc 原始地图文档
     */
    addStoryBook(book: StoryBook, doc: any) {
        if (!doc.story.books) {
            doc.story.books = [];
        }
        doc.story.books.push(book);
        return doc.story.books;
    }

    /**
     * @description 向地图文档新增故事书籍
     * @param book 添加书籍
     * @param doc 原始地图文档
     */
    deleteStoryBook(book: StoryBook, doc: any) {
        if (!doc.story.books) {
            doc.story.books = [];
        }
        return doc.story.books.filter((b) => {
            return b.key != book.key;
        });
    }

    updateStoryBook(book: StoryBook, doc: any) {
        if (!doc.story.books) {
            doc.story.books = [];
        }
        return doc.story.books.map((b) => {
            if (b.key == book.key) {
                b = book;
            }
            return b;
        });
    }

    /**
     * @description 向地图文档新增故事书籍
     * @param book 添加书籍
     * @param name 新的名字
     * @param doc 原始地图文档
     */
    renameStoryBook(book: StoryBook, name: string, doc: any) {
        if (!doc.story.books) {
            doc.story.books = [];
        }
        return doc.story.books.map((b) => {
            if (b.key == book.key) {
                b.title = name;
            }
            return b;
        });
    }

    /**
     * @description 查询对应的故事书籍事件
     * @param key 书籍的键值
     */
    getStoryEvent(key: string) {
        if (!this.books) {
            return undefined;
        }
        for (let i = 0; i < this.books.length; i++) {
            let book = this.books[i];
            for (let j = 0; j < book.events.length; j++) {
                let event = book.events[j];
                if (event.key === key) {
                    return event;
                }
            }
        }
        return undefined;
    }

    /**
     * @description 向地图文档的特定的书籍添加书签事件
     * @param event 添加的书签事件
     * @param book 被添加的书籍
     * @param doc 原始地图文档
     */
    addStoryEvent(event: StoryEvent, book: StoryBook | string, doc: any) {
        if (!doc.story.books) {
            doc.story.books = [];
            return doc.story.books;
        }

        for (let i = 0; i < doc.story.books.length; i++) {
            let item = doc.story.books[i];
            if (typeof book === "string") {
                if (book === item.key) {
                    item.events.push(event);
                }
            } else {
                if (book.key === item.key) {
                    item.events.push(event);
                }
            }
        }
        return doc.story.books;
    }

    /**
     * @description 向地图文档的特定的书籍删除书签事件
     * @param event 添加的书签事件
     * @param doc 原始地图文档
     */
    deleteStoryEvent(event: StoryEvent, doc: any) {
        if (!doc.story.books) {
            doc.story.books = [];
            return doc.story.books;
        }

        for (let i = 0; i < doc.story.books.length; i++) {
            let book = doc.story.books[i];
            let events = book.events;
            book.events = events.filter((e) => {
                return e.key !== event.key;
            });
        }
        return doc.story.books;
    }

    /**
     * @description 向地图文档的特定的书籍重命名书签事件
     * @param event 添加的书签事件
     * @param name 新的名字
     * @param doc 原始地图文档
     */
    renameStoryEvent(event: StoryEvent, name: string, doc: any) {
        if (!doc.story.books) {
            doc.story.books = [];
            return doc.story.books;
        }

        for (let i = 0; i < doc.story.books.length; i++) {
            let book = doc.story.books[i];
            let events = book.events;
            book.events = events.map((e) => {
                if (e.key === event.key) {
                    e.title = name;
                }
                return e;
            });
        }
        return doc.story.books;
    }

    /**
     * @description 向地图文档的特定的书籍更新书签事件
     * @param event 添加的书签事件
     * @param doc 原始地图文档
     */
    updateStoryEvent(event: StoryEvent, doc: any) {
        if (!doc.story.books) {
            doc.story.books = [];
            return doc.story.books;
        }

        for (let i = 0; i < doc.story.books.length; i++) {
            let book = doc.story.books[i];
            let events = book.events;
            book.events = events.map((e) => {
                if (e.key === event.key) {
                    e = event;
                }
                return e;
            });
        }
        return doc.story.books;
    }
}

/**
 * @description 故事->书籍
 */
export class StoryBook {
    title: string = "故事";
    key: string = "唯一键值";
    type: StoryType = StoryType.Book;
    events: Array<StoryEvent> = [];
    center: Positon = [114.350511, 30.585856];
    geojson: any = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [114.32201385498045, 30.639389000155038],
                            [114.22863006591797, 30.608663343564213],
                            [114.23583984374999, 30.551617781478765],
                            [114.28665161132812, 30.527370651150218],
                            [114.34707641601562, 30.52855357843757],
                            [114.37042236328125, 30.586203812332297],
                            [114.3511962890625, 30.619300251534735],
                            [114.32201385498045, 30.639389000155038],
                        ],
                    ],
                },
            },
        ],
    };
    bounds: Bounds = new GeoBounds(-180, -90, 180, 90);
}

/**
 * @description 故事->书籍-> 书签事件
 */
export class StoryEvent {
    title: string = "事件";
    subtitle?: string = '副标题';
    key: string = "唯一键值";
    type: StoryEventType = StoryEventType.Text;
    detail: string | Object = "事件说明";
    url: string = "./static/data/story/";
}