import {isPrimary,isWorker} from "node:cluster"
import * as nodePath from "node:path"
import {EventEmitter} from "node:events"

namespace cluer {

/*
 * summary
 *   simple indexer for disks
 *     - compute at each junction:-
 *     - hash codes, to tell if it changes faster
 *     - what folders to follow into via hash code change
 *   folder size change
 *   folder number of files change
 *   purpose
 *      - use to see what you have backed up in a sync across many disks or drives
 *      - use to get a change report
 *   programming
 *      - im curious how fast I can get a multi-threaded thing but mostly its to avoid problems and 
 *      improve workflow
 */


export interface IStat {
}

export type TCluerClass = {
    private exit()
}

export type TCluerNode = {
    t: string, // match internal type
    stat: object, // is stat record
    static?: object
    d?:object,
    ver: number,
    // hash can be object
    hash?:string|object
}

export type TCluerRecord= {
    // this must be in a sequence
}

export class Cluer<TCluerClass> {

    // metadata of the class is from the build
    static MD= {
        VER: ``,
        BUILD_NUM: ``,
        SEEDS: {
            // area from build for seeding
            precache: {}
        }
    }

    static NODE_TYPES= {

        // a node indicator the other nodes are from this path
        path: {

        },


        blob: {
            // a blob can be a buffer of cluer output, instead of creating many files it spreads buffers,
            // each buffer can have only these node types, for the data to be assigned the path must be first
            // if the path for some reason doesnt exist, the nodes exist, without a header path... 
            // this means some index wont work properly...
            // the index saves byte position of header
        },

        file: {
            limits: {
                stat: {
                    history: 1024
                }
            },
            d:{
                // last N reads of data
                read:[],
                // the stat record last
                stat:{
                    // current record
                    c:{},
                    // this field is history of the stat limited to last 100 changes by default
                    h: [

                    ]
                }
            }
        },

        dir: {
            limits: {
                stat: {
                    history: 1024
                }
            },
            d:{
                // the stat record last
                stat:{
                    // current record
                    c:{},
                    // this field is history of the stat limited to last 100 changes by default
                    h: [

                    ]
                }
            }
        }
    }

    static DEFAULTS= {
        primary: {
            user: {}
        },
        worker: {
            user: {}
        },
        options: {

        },
        rate: {
            workers: 3
        }
    }

    static SCHEMA= {
        config_keys: {
            reConfigKeys: '(a-z)\.(a-z)\.(a-z)'
        }
    }

    static TIME= {
        // these are needed when things are taking forever...
    }

    static LFO= {

    }

    // the basic validator works on the following
    static Validator= {
        // text file
        text_file: function() {

        }
        // jpeg file
        // png file
        // json file
    }

    static Connector= class {
        // export to postgres
        // export to orm
        // using .on() will be complicated but easiest
    }

    static Executor= class {
        // execute commands before things happen like mount the drive
        // this is a separate queue from master - so that threads dont create hundres.... they have to wait for these to resolve
        // it should only be used for `mount_drives_usb.sh` `mount_drives_usb.cmd`
    }

    static Runtime= class {
        // the reporter combines stats, with buckets
        session: {
            files: {
                unfiltered_didnt_match: [],
                no_extension: []
            }
        }
    }

    static FILTERS= {
        // we dont use regular expressions for this
        APPLICATIONS: [
            '.exe', '.com'
        ]
    }

    // this caches reads and does the hash changing part.. the operations are on top of it .. 
    // each fork gets one - since it would make no sense 

    // static const CluerIO = class extends EventEmitter {
    //     cache= {
    //         node: new WeakSet(),
    //         size: new WeakSet(),
    //         tree: {}
    //     }
    //     QUEUES= {

    //     }
    //     OPERATIONS= {
    //         statFile() {}
    //         readFile() {},
    //         magicFile() {},

    //     }
    //     #cache(node) {
    //         // get the size of the data
    //     }
    //     #bufferedReader({
    //         precache= "25mb",
    //     }) {

    //     }
    //     share_cache() {}

    //     emit() {}
    // }

    /* data */
    static EMPTY_MESSAGE= {
        // object or ref
        o: {},
        // metadata
        md: {
            t: Date.now()
        },
        // header
        h: {}
    }

    // a custom function to change the definition
    // this is called first, then an extension
    static $DEFINITION() {
        return {
            
        }
    }

    // flags is intended to be an indicator in a more complicated system but serves no real purpose than a boolean check 
    // for example with a gui
    FLAGS= {
        isPrimary,
        isWorker,
        isLocalClueIO: false
    }

    d= {
        // user
        options: {

        },

        /* data for fork/primary */
        metrics: {
        },

        // know args for session
        args: {},

        post_office: {
            primary: new Set(),
            worker: new Set(),
            stale: [Cluer.EMPTY_MESSAGE]
        },
        //cluerio:?object,
        _cio: {},
        flags: {}
    }

    // static data, is used for extensions
    // and common for all instances
    static sd= {
        cwd: nodePath.cwd()
    }

    // handles
    h= {
        io: null
    }

    constructor(data= null) {
        data===null 
            ? isPrimary
            : Cluer.DEFAULTS
                ? isWorker
                : {}
        this.d= Object.assign(
            {},
            Cluer.$DEFINITION(),
            this.d
        )
        this.d.cwd = nodePath.cwd()

        // thread or fork can use cluerIO, however only the primary does usually, and this is to spread any work from the main queue
        // todo matt is this right? or does the main queue still process operations in sequence for workers?? surely not
        // if(data.options.use_isolated_cluerio) {
        //     this.d._cio= new Cluer.CluerIO()
        //     this.FLAGS.isLocalCluerIO = true
        // }        

        const keys = Object.keys(data)
        let i = keys.length
        do {
            
        } while(i--)
    }

    path(
        path= Cluer.sd.cwd,
        options:{}
    ) {}

    config(key, data) {
        
    }

    // convert something not in form. it will take first words of each, if no words that pass simple check make sense
    // it will use 6 digits of each 
    #key_form(keyname, schema) {
        // keys must be of following form:-
            // a.b.c
            // foo.bar.baz
    }

    #force_arg() {
        // this freezes the args that started the constructor
        // the only main for Cluer is the Foreman but cluer keeps a record of the args...
    }

    #set_args(defs) {}

    #set_flag(key, val) {}

    #worker() {}

    index= [[]]

    create_index(options= {
        extension: {},
        name_pattern: {},
        media_type: {}
    }) {
        // cluer will store metadata about files via hash trees
        // it will expect path index node type at certain points in the cluer db
        // 
    }

    // included i18n with class
    static I18N= {
        lang: {
            'en-GB': {

            }
        }
    }

    // this is the not configured policy for anything complicated
    static CONFIG= {
        default: {
            err_caught: [ Cluer.#exit ],
            // if hte number of files for dir mismatches what we actually can read
            files_mismatch_readable: [],
            // this is only possible by knowing fast how big all the disks are ... we have to revist and see if there is a stat method .. 
            // tehre is cause smart knows how much usage there is ... and this is what you are calculatin ... and windows or liniux 
            warn_massive_operation: [],
            // when operation is not possible
            media_type_not_supported: [],
            // executing some extension failed todo stack heap growth
            retries_exceeded: [],
            // after a scan dirs to level configured are missing in sync archives
            warn_file_not_mirrored: [],
            // operations have become slow
            all_operations_have_become_slow: [
                // each fork - and workers will slow down via a global lfo to give disks a chance or os
                // to do stuff on that disk imbetween

                // if all forks are reporting a lower rate of completion messages... we can have config/policy 
                // to wait for x time:
                function block_main_queue_all_operations_slow() {
                    // do this somehow... 
                }
            ]
        }
    }

    static LIB= {
        PROFILES: {
            // added by user
            custom: {},
            // added by extensions
            ext: {},
            project: {
                release: {
                    use_cache: 1
                }
                
            },
            hardware: {
                low_io_low_cpu: {

                }
            }
        },
        CONSTRAINTS: { 
            usb_many_hubs_disk: {
                register: {
                    // we could make a function to be used in calls instead we can use Cluer.LFO
                },
                configure: {
                    lfo: {
                        rate: 0.25 // factor 0.25
                    }
                }
            }
        }
    }

    // these are definitions they are called with
    // options should always be last
    // v1
    static OPERATIONS= {

        // each queue operation - begins with object
        get_current_object() {

        },

        // for an [m]ain[q]ueue.opqueue.operation
        //  -- we take globally registered functions first that are part of the engine
        //  -- then a profile can override the first slot, 
        //  -- after this a user can change any of the above via arguments
        // todo matt teh process though is in reverse ... user is immutable args

        // this means a operation of operations, can be unique for a fork of a fork of a operation of operations if need be
        register() {},

        // for the instance bubble a heartbeat to know its processing still
        heartbeat() {},

        // for timem pause operation of operations
        pause(time) {},

        get_path() {
            this.version = 1
        },
        
        pre_index() {},
        index() {},
        post_index() {},

        must_lock() {},

        has_changed(){
            // -> requires prop('date')
        },
        is_empty() {},
        
        name() {},
        type() {},
        prop() {},
        read() {},
        hash({profiles,options={}}) {
            // if profile is fast , or full
        },
        
        vol_precheck() {
            // does a small test before operations
        },

        // flow control
        invariant({override,}) {
            // safety catch a chain error
        },

        create_link() {},
        // if the file is not existing somewhere else copy it
        copy_if() {}
    }

    static OP_QUEUE = {
        register: {
            heap_checker() {}
        },
        // active
        a: {},
        // back log ... 
        bl: {}
    }
    static OP_RUNNER= {
        operation() {
            // first generate operate id
            // second ...
        }
    }
    static OP_COMPLETED= (job) => void 0
    static OP_NOOP= () => void 0
    static OPERATION_TEMPLATE= ({
        // the data the function is called with
        current,
            // current.d
                // --> data supplied to operation
            // current.o.foo
                // --> data supplied to function as option
        // the index position for the operation
        index,
        // the queue for the current operation
        opqueue,
    }) => void 0

    /* create message - valid */
    static message({ops, id, uuid, guid, data}) {

    }

    /* instances can call static postMessage - for a fork this is just the same - since 
    this would only be used for a customised derivative of the main class */
    static postMessage(op, msg) {

    }

    /* a search is performed always across worker threads in forks - its best to use 1 fork and 2 threads - this depends on the disk type */
    postMessage(op, msg) {

    }

    main() {
        // check for anything registered to do 
    }

    // class enum would be great
    static PRIORITIES= [1,3,5,10,20]

    /* -resident */
    // register to main queue
    register(key,obj,priority= 5) {

    }

    // listen primary
    static listen() {

    }

    // exit
    static exit({
        soft= true, 
        hard= false
    }) {
    }

    static get extensions(a,b) {
        return Cluer.sd.extensions
    }
}

export class CluerStats implements IStat {
    d= {
        // binding to cluer
        cluer
    }
    // todo(matt): is using ?. bad everywhere as opposed to just knowing something exists?
    get items() {
        // it uses event emitter and postMessage
    }    
}

// the foreman is the only way to use the class and provides some handy default operations
export class CluerForeman {
    BEHAVIOURS: {}
    FEATURES: {
        // CompareDirs: {
        //     desc: 'compare two directories'
        // },
        // GetTreeForExtensionType: {},
        // GetChangedFilesFrom: {},
        // CachedChanged: {},
        // CompareHashTree: {
        //     args: {
        //         a: {

        //         },
        //         b: {
                    
        //         }
        //     }
        // }
        // TestDisk: {
        //     desc: `
        //         Alpha project:-
        //             This creates and reads a few built in file types; that are created from hashed data.
        //             If the disk is not working properly then the test will fail.
        //     `
        // }
        
        // SetValidateFiles(),
        // periodically it will check a matching file type for readability
        //static #validateFile() {}
        
        //FileListCommander() {}
        
        //IfCompressionIsBadUncompressIt() {}
        
        //DuplicatesFromDir(src, options= {mask,name,prop}) {}
        //reallyOldackup


        //WriteFolderTree() {}


        //CreateShortcutsIfExistsIn
        // if indexed volumes dirs are the same recreate the shared common tree of same things

        // get others from msmeo and es-mm

        //RandomSelectionOfFilesFromDir
    }

    /* this class is used to execute a function and authorise the retries */
    static Executor = class extends EventEmitter {

    }

    static Migrate = class {}

    static ForemanCluer = new Cluer() {}
    
    // a simple stack for using CluerExecutor
    #Stack() {

    }

    #merge_contrib() {}
    execute(id,options) {}
    create_session() {}
    restore_session() {}
}

if (esMain(import.meta)) {
    // ..
}

}