import { Bounds, GeoBounds, Position } from "../../map";

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
    Picture = "picture",
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
    static wrapper(story: any) {
        let storyObj;
        if (story) {
            const { books, current } = story;
            storyObj = new Story(books);
            storyObj.current = current;
        } else {
            storyObj = new Story();
            storyObj.current = "";
        }

        return storyObj;
    }

    current: string = "";
    books: StoryBook[] = [];

    /**
     * @description 将故事对象封装包裹类
     * @param story 故事对象
     */


    constructor(books?: StoryBook[]) {
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
        for (const book of this.books) {
            if (id === book.key) {
                return book;
            }
            for (const event of book.events) {
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
        if (!id) {
            const book = this.getCurrentBook(this.current);
            if (book && book.events && book.events.length > 0) {
                if (book.current === undefined) {
                    book.current = book.events[0].key;
                    return book.events[0];
                } else {
                    for (const event of book.events) {
                        if (event.key === book.current) {
                            return event;
                        }
                    }
                }
                return undefined;
            }
        }
        id = id || this.current;
        for (const book of this.books) {
            if (book.key === id && book.events.length > 0) {
                return book.events[0];
            }
            for (const event of book.events) {
                if (event.key === id) {
                    return event;
                }
            }
        }
        return undefined;
    }

    /**
     * @description 返回当前激活的事件Book->Event的下标
     * @param id 查询键值
     */
    getCurrentEventIndex(id?: string) {
        let index = -1;
        if (!id) {
            const book = this.getCurrentBook(this.current);
            if (book && book.events && book.events.length > 0) {
                if (book.current === undefined) {
                    book.current = book.events[0].key;
                    return 0;
                } else {
                    index = 0;
                    for (const event of book.events) {
                        if (event.key === book.current) {
                            return index;
                        }
                        index++;
                    }
                }
                return index;
            }
        }

        id = id || this.current;
        for (const book of this.books) {
            if (book.key === id && book.events.length > 0) {
                return 0;
            }
            index = 0;
            for (const event of book.events) {
                if (event.key === id) {
                    return index;
                }
                index++;
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
        for (const book of this.books) {
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
            return b.key !== book.key;
        });
    }

    updateStoryBook(book: StoryBook, doc: any) {
        if (!doc.story.books) {
            doc.story.books = [];
        }
        return doc.story.books.map((b) => {
            if (b.key === book.key) {
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
            if (b.key === book.key) {
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
        for (const book of this.books) {
            for (const event of book.events) {
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

        for (const item of doc.story.books) {
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

        for (const book of doc.story.books) {
            const { events } = book;
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

        for (const book of doc.story.books) {
            const { events } = book;
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

        for (const book of doc.story.books) {
            const { events } = book;
            book.events = events.map((e) => {
                if (e.key === event.key) {
                    e = event;
                }
                return e;
            });
        }
        return doc.story.books;
    }

    /**
     * @description 向地图文档的特定的书籍播放特定的书签事件
     * @param event 当前播放的书签事件
     * @param doc 原始地图文档
     */
    playStoryEvent(event: StoryEvent, doc: any) {
        if (!doc.story.books) {
            doc.story.books = [];
            return doc.story.books;
        }

        for (const book of doc.story.books) {
            const { events } = book;
            book.events = events.map((e) => {
                if (e.key === event.key) {
                    book.current = event.key;
                }
                return e;
            });
        }
        return doc.story.books;
    }

    /**
     * @description 向地图文档的特定的书籍播放上一个书签事件
     * @param event 当前播放的书签事件
     * @param doc 原始地图文档
     */
    backwardStoryEvent() {
        if (!this.books) {
            this.books = [];
            return;
        }

        let bookIndex = -1;
        let eventIndex = -1;
        let bookPos = 0;
        let eventPos = 0;
        const event = this.getCurrentEvent();

        for (const book of this.books) {
            const { events } = book;
            book.events = events.map((e, j) => {
                if (e.key === event.key) {
                    bookIndex = bookPos;
                    eventIndex = eventPos;
                }
                eventPos++;
                return e;
            });
            bookPos++;
        }
        if (
            eventIndex <= this.books[bookIndex].events.length - 1 &&
                eventIndex > 0
        ) {
            eventIndex = eventIndex - 1;
            const currentEvent = this.books[bookIndex].events[eventIndex];
            this.books[bookIndex].current = currentEvent.key;
        }
    }

    /**
     * @description 向地图文档的特定的书籍播放下一个书签事件
     * @param event 当前播放的书签事件
     * @param doc 原始地图文档
     */
    forwardStoryEvent() {
        if (!this.books) {
            this.books = [];
            return;
        }

        let bookIndex = -1;
        let eventIndex = -1;
        let bookPos = 0;
        let eventPos = 0;

        const event = this.getCurrentEvent();

        for (const book of this.books) {
            const {events} = book;
            book.events = events.map((e, j) => {
                if (e.key === event.key) {
                    bookIndex = bookPos;
                    eventIndex = eventPos;
                }
                eventPos++;
                return e;
            });
            bookPos++;
        }
        if (
            eventIndex < this.books[bookIndex].events.length - 1 &&
                eventIndex >= 0
        ) {
            eventIndex = eventIndex + 1;
            const currentEvent = this.books[bookIndex].events[eventIndex];
            this.books[bookIndex].current = currentEvent.key;
        }
    }

    /**
     * @description 向地图文档的特定的书籍播放指定位置的书签事件
     * @param index 需要定位的事件序号
     */
    moveToStoryEvent(index: number) {
        if (!this.books) {
            this.books = [];
            return;
        }
        const book = this.getCurrentBook();
        if (!book || !book.events) {
            return;
        }
        if (index < book.events.length) {
            book.current = book.events[index].key;
        }
    }
}

/**
 * @description 故事->书籍
 */
export class StoryBook {
    static wrapper(book: StoryBook) {
        const obj = new StoryBook();
        const { title, key, type, current, events, center, geojson, bounds } = book;
        obj.title = title;
        obj.key = key;
        obj.type = type;
        obj.current = current;
        obj.events = events.map((e) => StoryEvent.wrapper(e));
        obj.center = center;
        obj.geojson = geojson;
        obj.bounds = bounds;
        return obj;
    }

    title: string = "故事";
    key: string = "唯一键值";
    type: StoryType = StoryType.Book;
    /** 当前地图故事正在播放的事件 */
    current: string;
    events: StoryEvent[] = [];
    center: Position = [114.350511, 30.585856];
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

    getCurrentEventIndex() {
        let index = -1;
        for (const event of this.events) {
            index++;
            if (event.key === this.current) {
                return index;
            }
        }
        return index;
    }

    getCurrentEventPercent() {
        const count = this.events.length;
        for (let i = 0; i < count; i++) {
            const event = this.events[i];
            if (event.key === this.current) {
                return ((i + 1) * 100) / count;
            }
        }
        return 0;
    }

    serialEvent(events: StoryEvent[], funcs: any[]) {
        if (events.length <= 0) {
            return;
        }
        const start = events[0];
        funcs.reduce((prev, cur, index) => {
            const event = events[index];
            return prev.then(() => cur(event));
        }, Promise.resolve(start));
    }

    replayEvent() {
        this.serialEvent(
            this.events,
            this.events.map((e) => e.play)
        );
    }
}

/**
 * @description 故事->书籍-> 书签事件
 */
export class StoryEvent {
    static wrapper(event: StoryEvent) {
        const obj = new StoryEvent();
        const {
            title,
            subtitle,
            key,
            type,
            detail,
            url,
            duration,
            onPlayed,
        } = event;
        obj.title = title;
        obj.key = key;
        obj.subtitle = subtitle;
        obj.type = type;
        obj.detail = detail;
        obj.url = url;
        obj.duration = duration;
        obj.onPlayed = onPlayed;
        return obj;
    }

    title: string = "事件";
    subtitle?: string = "副标题";
    key: string = "唯一键值";
    type: StoryEventType = StoryEventType.Text;
    detail: string | object = "事件说明";
    url: string = "./static/data/story/";
    /** 持续时间： 默认5秒 */
    duration: number = 5;

    /**
     * @description 可在外面的业务代码重写改函数实现外部的业务逻辑
     */
    onPlayed() {
        // 可在外面的业务代码重写改函数实现外部的业务逻辑
    }

    play(event: StoryEvent) {
        return new Promise((resolve, reject) => {
            window.setTimeout(() => {
                event.onPlayed();
                resolve(event);
            }, event.duration * 1000);
        });
    }
}
