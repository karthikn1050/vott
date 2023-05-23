"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chinesetw = void 0;
/**
 * App Strings for Traditional Chinese (zh-tw)
 */
exports.chinesetw = {
    appName: "VOTT視覺物件標記工具",
    common: {
        displayName: "顯示名稱",
        description: "說明",
        submit: "送出",
        cancel: "取消",
        save: "儲存",
        delete: "刪除",
        provider: "提供者",
        homePage: "首頁", // Home Page
    },
    titleBar: {
        help: "說明",
        minimize: "最小化",
        maximize: "最大化",
        restore: "還原",
        close: "關閉", // Close
    },
    homePage: {
        newProject: "新專案",
        openLocalProject: {
            title: "打開本機專案", // Open Local Project
        },
        openCloudProject: {
            title: "打開雲端專案",
            selectConnection: "選擇連線", // Select a Connection
        },
        recentProjects: "最近的專案",
        deleteProject: {
            title: "刪除專案",
            confirmation: "確定要刪除專案?", // Are you sure you want to delete project
        },
        importProject: {
            title: "匯入專案",
            confirmation: "您確定要將專案${project.file.name}的設定轉換為v2格式嗎？我們建議您首先備份專案文件。",
            // Are you sure you want to convert project ${project.file.name} project settings to v2 format?
            // We recommend you backup the project file first.
        },
        messages: {
            deleteSuccess: "已成功刪除${project.name}專案", // Successfully deleted ${project.name}
        },
    },
    appSettings: {
        title: "應用程式設定",
        storageTitle: "儲存空間設定",
        uiHelp: "您的設定存放在哪裡",
        save: "保存設定",
        securityToken: {
            name: {
                title: "名稱", // Name
            },
            key: {
                title: "鍵", // Key
            },
        },
        securityTokens: {
            title: "安全性權杖",
            description: "安全性權杖用於加密專案組態中的敏感資料",
            // Security tokens are used to encrypt sensitive data within your project configuration
        },
        version: {
            description: "版本：", // Version:
        },
        commit: "提交SHA",
        devTools: {
            description: "打開應用程式開發工具以幫助診斷問題",
            button: "切換開發工具", // Toggle Developer Tools
        },
        reload: {
            description: "重新載入應用程式，放棄所有目前做的修改",
            button: "重新整理應用程式", // Refresh Application
        },
        messages: {
            saveSuccess: "已成功保存應用程式設定", // Successfully saved application settings
        },
    },
    projectSettings: {
        title: "專案設定",
        securityToken: {
            title: "安全性權杖",
            description: "用於加密專案檔案中的敏感資料", // Used to encrypt sensitive data within project files
        },
        useSecurityToken: {
            title: "使用安全令牌",
            description: "啟用後將在提供者配置內加密敏感數據",
            // When enabled will encrypt sensitive data within provider configuration
        },
        save: "保存專案",
        sourceConnection: {
            title: "來源連線",
            description: "從何處載入資料", // Where to load assets from
        },
        targetConnection: {
            title: "目標連線",
            description: "在哪裡保存專案和匯出的資料", // Where to save the project and exported data
        },
        videoSettings: {
            title: "影片設定",
            description: "設定影片標記的速率",
            frameExtractionRate: "影像取樣率（影像每秒的畫面數）", // Frame Extraction Rate (frames per a video second)
        },
        addConnection: "新增連線",
        messages: {
            saveSuccess: "已成功保存${project.name}專案設定", // Successfully saved ${project.name} project settings
        },
    },
    projectMetrics: {
        title: "專案相關指標",
        assetsSectionTitle: "圖像數據",
        // As for this VOTT tool, translate "Assets" to "Image data" in Traditional Chinese,
        // as "Asset" can be confusing if directly translated.
        totalAssetCount: "圖像數據總數",
        visitedAssets: "已檢視的圖像數據（${count}）",
        taggedAssets: "已標記的圖像數據（${count}）",
        nonTaggedAssets: "未標記的圖像數據（${count}）",
        nonVisitedAssets: "未檢視的圖像數據（${count}）",
        tagsSectionTitle: "標記和標籤",
        // Tags & Labels, so it can actually be same translation to Tags and Labels in Traditional Chinese,
        // to differentiate, having slightly different translation for both keywords.
        totalRegionCount: "已標記區域總數",
        totalTagCount: "標記總數",
        avgTagCountPerAsset: "每個圖像數據的平均標記數", // Average tags per asset
    },
    tags: {
        title: "標記",
        placeholder: "新增標記",
        editor: "標記編輯器",
        modal: {
            name: "標記名稱",
            color: "標記顏色", // Tag Color
        },
        colors: {
            white: "白色",
            gray: "灰色",
            red: "紅色",
            maroon: "栗色",
            yellow: "黃色",
            olive: "橄欖",
            lime: "酸橙",
            green: "綠色",
            aqua: "水色",
            teal: "藍綠色",
            blue: "藍色",
            navy: "海軍",
            fuschia: "紫紅色",
            purple: "紫色", // Purple
        },
        warnings: {
            existingName: "標記名稱已存在。請選擇其他名字",
            emptyName: "標記名稱不能為空白",
            unknownTagName: "未命名", // Unknown
        },
        toolbar: {
            add: "新增標記",
            search: "尋找標記",
            edit: "編輯標記",
            lock: "鎖定標記",
            moveUp: "向上移動標記",
            moveDown: "向下移動標記",
            delete: "刪除標記", // Delete tag
        },
    },
    connections: {
        title: "連線",
        details: "連線細節",
        settings: "連線設定",
        instructions: "請選擇一個連線進行編輯",
        save: "保存連線",
        messages: {
            saveSuccess: "已成功儲存${connection.name}",
            deleteSuccess: "已成功刪除${connection.name}", // Successfully deleted ${connection.name}
        },
        imageCorsWarning: "警告：在Web瀏覽器中使用VoTT時，由於CORS（跨源資源共享）限制，來自Bing Image Search的某些圖像數據可能無法正確匯出。",
        // Warning: When using VoTT in a Web browser, some assets from Bing Image Search may not export correctly
        // due to CORS (Cross Origin Resource Sharing) restrictions.
        blobCorsWarning: "警告：必須在Azure Blob儲存體帳戶上啟用CORS（跨域資源共享），才能將其用作來源或目標連接。 {0}中提供了有關啟用CORS的更多資訊。",
        // Warning: CORS (Cross Domain Resource Sharing) must be enabled on the Azure Blob Storage account,
        // in order to use it as a source or target connection.
        // More information on enabling CORS can be found in the {0}
        azDocLinkText: "Azure說明文件",
        providers: {
            azureBlob: {
                title: "Azure Blob 儲存體",
                description: "",
                accountName: {
                    title: "帳戶名",
                    description: "",
                },
                containerName: {
                    title: "容器名稱",
                    description: "",
                },
                sas: {
                    title: "SAS",
                    description: "用於驗證Blob儲存體帳戶的共用存取簽章",
                    // Shared access signature used to authenticate to the blob storage account
                },
                createContainer: {
                    title: "新增容器",
                    description: "新增blob容器（如果還不存在時）", // Creates the blob container if it does not already exist
                },
            },
            bing: {
                title: "Bing 影像搜尋",
                options: {
                    title: "Bing 影像搜尋選項",
                },
                endpoint: {
                    title: "Endpoint",
                    description: "必應搜索 Azure 資源中列出的終結點",
                },
                apiKey: {
                    title: "API密鑰",
                    description: "必應搜索 Azure 資源中列出的 API 金鑰",
                },
                query: {
                    title: "查詢",
                    description: "用於填充連接的搜索查詢",
                },
                aspectRatio: {
                    title: "長寬比",
                    description: "按指定的縱橫比篩選結果",
                    options: {
                        all: "所有",
                        square: "矩形",
                        wide: "寬",
                        tall: "高", // Tall
                    },
                },
                licenseType: {
                    title: "許可證類型",
                    description: "按指定的許可證類型篩選結果",
                    options: {
                        all: "全部(不過濾任何影像)",
                        any: "任何許可證類型的圖像",
                        public: "公有領域",
                        share: "免費分享和使用",
                        shareCommercially: "免費共用和使用商業",
                        modify: "免費修改、共用和使用",
                        modifyCommercially: "可自由修改、共用和在商業上使用",
                    },
                },
                size: {
                    title: "大小",
                    description: "按指定大小篩選結果",
                    options: {
                        all: "所有",
                        small: "小(小於200x200)",
                        medium: "中等(小於 500x500)",
                        large: "大(大於 500x500)",
                        wallpaper: "桌布(超大影像)",
                    },
                },
            },
            local: {
                title: "本機檔案系統",
                folderPath: "資料夾路徑",
                selectFolder: "選擇資料夾",
                chooseFolder: "選取資料夾", // Choose Folder
            },
        },
    },
    editorPage: {
        width: "寬度",
        height: "高度",
        tagged: "已標記",
        visited: "已檢視",
        toolbar: {
            select: "選擇 (V)",
            pan: "全景",
            drawRectangle: "繪製矩形",
            drawPolygon: "繪製多邊形",
            copyRectangle: "複製矩形",
            copy: "複製區域",
            cut: "剪下區域",
            paste: "貼上區域",
            removeAllRegions: "刪除所有區域",
            previousAsset: "以前的圖像數據",
            nextAsset: "下一個圖像數據",
            saveProject: "儲存專案",
            exportProject: "匯出專案",
            activeLearning: "主動學習", // Active Learning
        },
        videoPlayer: {
            previousTaggedFrame: {
                tooltip: "上一個標記的畫面", // Previous Tagged Frame
            },
            nextTaggedFrame: {
                tooltip: "下一個標記的畫面", // Next Tagged Frame
            },
            previousExpectedFrame: {
                tooltip: "上一個畫面", // Previous Frame
            },
            nextExpectedFrame: {
                tooltip: "下一個畫面", // Next Frame
            },
        },
        help: {
            title: "切換輔助說明選單",
            escape: "離開輔助說明選單", // Escape Help Menu
        },
        assetError: "無法載入圖像數據",
        tags: {
            hotKey: {
                apply: "使用快捷鍵來套用標記",
                lock: "用快捷鍵來鎖定標記", // Lock Tag with Hot Key
            },
            rename: {
                title: "重新命名標記",
                confirmation: "您確定要重新命名此標記嗎？它將在所有圖像數據中被重新命名",
                // Are you sure you want to rename this tag? It will be renamed throughout all assets
            },
            delete: {
                title: "刪除標記",
                confirmation: "您確定要刪除此標記嗎？它將在所有圖像數據中被刪除，並且只有使用此標記的任何區域也將被刪除",
                // Are you sure you want to delete this tag? It will be deleted throughout all assets
                // and any regions where this is the only tag will also be deleted
            },
        },
        canvas: {
            removeAllRegions: {
                title: "刪除所有區域",
                confirmation: "您確定要刪除所有區域嗎？", // Are you sure you want to remove all regions?
            },
        },
        messages: {
            enforceTaggedRegions: {
                title: "檢測到無效的區域",
                description: "一個或多個區域尚未被標記。在繼續下一個圖像數據之前，請確保所有區域均已標記。",
                // 1 or more regions have not been tagged.
                // Ensure all regions are tagged before continuing to next asset.
            },
        },
    },
    export: {
        title: "匯出",
        settings: "匯出設定",
        saveSettings: "儲存匯出設定",
        providers: {
            common: {
                properties: {
                    assetState: {
                        title: "圖像數據狀態",
                        description: "匯出項目中包括哪些圖像數據",
                        options: {
                            all: "所有圖像數據",
                            visited: "只有已檢視的圖像數據",
                            tagged: "只有已標記的圖像數據", // Only tagged Assets
                        },
                    },
                    testTrainSplit: {
                        title: "測試/訓練分割",
                        description: "測試訓練分割以用於匯出數據", // The test train split to use for exported data
                    },
                    includeImages: {
                        title: "包含圖像",
                        description: "是否在目標連接中包括二進位圖像數據",
                        // Whether or not to include binary image assets in target connection
                    },
                },
            },
            vottJson: {
                displayName: "VoTT JSON", // VoTT JSON
            },
            azureCV: {
                displayName: "Azure自訂視覺服務",
                regions: {
                    // reference to https://azure.microsoft.com/zh-tw/global-infrastructure/geographies/
                    // for official translation
                    australiaEast: "澳大利亞東部",
                    centralIndia: "印度中部",
                    eastUs: "美國東部",
                    eastUs2: "美國東部 2",
                    japanEast: "日本東部",
                    northCentralUs: "美國中北部",
                    northEurope: "北歐",
                    southCentralUs: "美國中南部",
                    southeastAsia: "東南亞",
                    ukSouth: "英國南部",
                    westUs2: "美國西部 2",
                    westEurope: "西歐", // West Europe
                },
                properties: {
                    apiKey: {
                        title: "API密鑰", // API Key
                    },
                    region: {
                        title: "區域",
                        description: "部署服務的Azure區域", // The Azure region where your service is deployed
                    },
                    classificationType: {
                        title: "分類類型",
                        options: {
                            multiLabel: "每個圖像多個標記",
                            multiClass: "每個圖像一個標記", // Single tag per image
                        },
                    },
                    name: {
                        title: "專案名", // Project Name
                    },
                    description: {
                        title: "專案簡介", // Project Description
                    },
                    domainId: {
                        title: "領域", // Domain
                    },
                    newOrExisting: {
                        title: "新增專案或既有專案",
                        options: {
                            new: "新增專案",
                            existing: "既有專案", // Existing Project
                        },
                    },
                    projectId: {
                        title: "專案名稱", // Project Name
                    },
                    projectType: {
                        title: "專案類型",
                        options: {
                            classification: "分類",
                            objectDetection: "物件偵測", // Object Detection
                        },
                    },
                },
            },
            tfRecords: {
                displayName: "Tensorflow記錄", // Tensorflow Records
            },
            pascalVoc: {
                displayName: "Pascal VOC",
                exportUnassigned: {
                    title: "匯出未指定的項目",
                    description: "是否在已匯出的數據中包括未指定的標記", // Whether or not to include unassigned tags in exported data
                },
            },
            cntk: {
                displayName: "Microsoft Cognitive Toolkit（CNTK)", // Microsoft Cognitive Toolkit (CNTK)
            },
            csv: {
                displayName: "逗號分隔格式 (CSV)", // Comma Separated Values (CSV)
            },
        },
        messages: {
            saveSuccess: "已成功儲存匯出設定", // Successfully saved export settings
        },
    },
    activeLearning: {
        title: "主動學習",
        form: {
            properties: {
                modelPathType: {
                    title: "模型提供者",
                    description: "從何處載入訓練模型",
                    options: {
                        preTrained: "預先訓練Coco SSD",
                        customFilePath: "自訂（檔案路徑）",
                        customWebUrl: "自訂 (URL)", // Custom (Url)
                    },
                },
                autoDetect: {
                    title: "自動偵測",
                    description: "在圖像數據之間瀏覽時是否自動進行預測",
                    // Whether or not to automatically make predictions as you navigate between assets
                },
                modelPath: {
                    title: "模型路徑",
                    description: "從本機檔案系統中選擇模型", // Select a model from your local file system
                },
                modelUrl: {
                    title: "模型網址",
                    description: "從公共網址載入模型", // Load your model from a public web URL
                },
                predictTag: {
                    title: "預測標記",
                    description: "是否在預測中自動包含標記", // Whether or not to automatically include tags in predictions
                },
            },
        },
        messages: {
            loadingModel: "正在載入主動學習模型...",
            errorLoadModel: "載入主動學習模型時出現錯誤",
            saveSuccess: "已成功儲存主動學習設定", // Successfully saved active learning settings
        },
    },
    profile: {
        settings: "個人資料設定", // Profile Settings
    },
    errors: {
        unknown: {
            title: "未知錯誤",
            message: "該應用程式遇到未知錯誤。請再試一遍。", // The app encountered an unknown error. Please try again.
        },
        projectUploadError: {
            title: "上傳檔案時出現錯誤",
            message: "上傳檔案時出現錯誤。請確認檔案格式正確，然後重試。",
            // There was an error uploading the file. Please verify the file is of the correct format and try again.
        },
        genericRenderError: {
            title: "載入應用程序時出現錯誤",
            message: "轉譯應用程序時發生錯誤。請再試一遍", // An error occured while rendering the application. Please try again
        },
        projectInvalidSecurityToken: {
            title: "載入專案文件時出現錯誤",
            message: "專案使用的安全性認證無效。請驗證是否在您的應用程式設定中正確的設定了專案的安全性認證",
            // The security token referenced by the project is invalid. Verify that the security token
            // for the project has been set correctly within your application settings
        },
        projectInvalidJson: {
            title: "解析專案文件時出現錯誤",
            message: "所選擇的專案文件不包含有效的JSON格式。請確認該專案檔案並且重試。",
            // The selected project files does not contain valid JSON. Please check the file any try again.
        },
        projectDeleteError: {
            title: "刪除專案時出現錯誤",
            message: "刪除專案時發生錯誤。請確認專案檔案和安全性認證是否存在，然後重試",
            // An error occured while deleting the project.
            // Validate the project file and security token exist and try again
        },
        securityTokenNotFound: {
            title: "載入專案檔案時出現錯誤",
            message: "在當前的應用程式設定中找不到該專案所使用的安全性認證。請確認安全性認證是否存在，然後嘗試重新載入專案。",
            // The security token referenced by the project cannot be found in your current application settings.
            // Verify the security token exists and try to reload the project.
        },
        canvasError: {
            title: "載入畫面時出現錯誤",
            message: "載入畫面時發生錯誤，請檢查專案的圖像數據，然後重試。",
            // There was an error loading the canvas, check the project's assets and try again.
        },
        importError: {
            title: "匯入V1格式專案時出現錯誤",
            message: "匯入V1格式專案時出現錯誤。請檢查專案檔案，然後重試",
            // There was an error importing the V1 project. Check the project file and try again
        },
        pasteRegionTooBigError: {
            title: "貼上區域時發生錯誤",
            message: "此區域對於這一個圖像數據太大了。請嘗試複製其他的區域",
            // Region too big for this asset. Try copying another region
        },
        exportFormatNotFound: {
            title: "匯出專案時出現錯誤",
            message: "專案設定中缺少匯出格式。請在匯出設定畫面中選擇一種匯出格式。",
            // Project is missing export format.  Please select an export format in the export setting page.
        },
        activeLearningPredictionError: {
            title: "主動學習錯誤",
            message: "在預測當前圖像數據中的區域時發生錯誤。請確認您的主動學習相關設定，然後重試",
            // An error occurred while predicting regions in the current asset.
            // Please verify your active learning configuration and try again
        },
    },
};
