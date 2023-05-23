"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.korean = void 0;
/**
 * App Strings for Korean language from Google Translate
 */
exports.korean = {
    appName: "비주얼 객체 태깅 도구",
    common: {
        displayName: "프로젝트 이름",
        description: "설명",
        submit: "제출",
        cancel: "취소",
        save: "저장",
        delete: "삭제",
        provider: "공급자",
        homePage: "홈페이지", // Home Page"
    },
    titleBar: {
        help: "도움",
        minimize: "최소화",
        maximize: "최대화",
        restore: "되돌리기",
        close: "닫기", // Close"
    },
    homePage: {
        newProject: "새로운 프로젝트",
        openLocalProject: {
            title: "로컬 프로젝트 열기", // Open Local Project"
        },
        openCloudProject: {
            title: "클라우드 프로젝트 열기",
            selectConnection: "Connection 선택", // Select a Connection
        },
        recentProjects: "최근 프로젝트",
        deleteProject: {
            title: "프로젝트 삭제",
            confirmation: "프로젝트를 삭제 하시겠습니까?", // Are you sure you want to delete project
        },
        importProject: {
            title: "프로젝트 가져 오기",
            confirmation: "${project.file.name} 프로젝트 설정을 v2 형식으로 수정 하시겠습니까? 수정하시기 전에 프로젝트 파일을 백업해두시기 바랍니다.",
            // Are you sure you want to conver project ${project.file.name} project settings to v2 format?
            // We recommend you backup the project file first."
        },
        messages: {
            deleteSuccess: "${project.name}을 삭제했습니다", // Successfully deleted ${project.name}"
        },
    },
    appSettings: {
        title: "애플리케이션 설정",
        storageTitle: "저장소 설정",
        uiHelp: "설정이 저장된 위치",
        save: "설정 저장",
        securityToken: {
            name: {
                title: "이름", // Name
            },
            key: {
                title: "키", // Key
            },
        },
        securityTokens: {
            title: "보안 토큰",
            description: "보안 토큰은 프로젝트 구성 내에서 중요한 데이터를 암호화하는 데 사용됩니다",
            // Security tokens are used to encryp sensitive data within your project configuration"
        },
        version: {
            description: "버전：", // Version"
        },
        commit: "커밋 SHA",
        devTools: {
            description: "이슈 진단을 돕기 위한 개발자 도구 열기",
            button: "개발자 도구 전환", // Toggle Developer Tools
        },
        reload: {
            description: "모든 변경사항을 버리고 애플리케이션을 재시작 합니다",
            button: "애플리케이션 새로고침", // Refresh Application
        },
        messages: {
            saveSuccess: "애플리케이션 설정이 성공적으로 저장되었습니다", // Successfully saved application settings
        },
    },
    projectSettings: {
        title: "프로젝트 설정",
        securityToken: {
            title: "보안 토큰",
            description: "프로젝트 파일 내에서 중요한 데이터를 암호화하는 데 사용", // Used to encrypt sensitive data within project file
        },
        useSecurityToken: {
            title: "보안 토큰 사용",
            description: "활성화되면 공급자 구성 내에서 중요한 데이터를 암호화합니다.",
            // When enabled will encrypt sensitive data within provider configuration
        },
        save: "프로젝트 저장",
        sourceConnection: {
            title: "소스 연결",
            description: "Asset 저장 경로", // Where to load assets from
        },
        targetConnection: {
            title: "대상 연결",
            description: "프로젝트 및 내 보낸 데이터를 저장할 위치", // Where to save the project and exported data
        },
        videoSettings: {
            title: "비디오 설정",
            description: "태그 지정을 위해 프레임을 추출하는 비율",
            frameExtractionRate: "프레임 추출 속도 (비디오 초당 프레임)", // Frame Extraction Rate (frames per a video second)
        },
        addConnection: "연결 추가",
        messages: {
            saveSuccess: "${project.name} 프로젝트 설정을 성공적으로 저장했습니다", // Successfully saved ${project.name} project settings
        },
    },
    projectMetrics: {
        title: "프로젝트 매트릭",
        assetsSectionTitle: "Asset",
        totalAssetCount: "총 Asset",
        visitedAssets: "검토한 Asset (${count})",
        taggedAssets: "태그된 Asset (${count})",
        nonTaggedAssets: "태그가 없는 Asset (${count})",
        nonVisitedAssets: "검토하지 않은 Asset (${count})",
        tagsSectionTitle: "태그",
        totalRegionCount: "태그된 지역 수",
        totalTagCount: "태그 숫자",
        avgTagCountPerAsset: "Asset 당 평균 태그 숫자", // Average tags per asset"
    },
    tags: {
        title: "태그",
        placeholder: "새 태그 추가",
        editor: "태그 편집기",
        modal: {
            name: "태그 이름",
            color: "태그 색상", // Tag Color"
        },
        colors: {
            white: "하얀색",
            gray: "회색",
            red: "빨간색",
            maroon: "밤색",
            yellow: "노랑색",
            olive: "올리브색",
            lime: "라임색",
            green: "초록색",
            aqua: "아쿠아",
            teal: "물오리",
            blue: "파랑색",
            navy: "군청색",
            fuschia: "푸시아",
            purple: "보라색", // Purple"
        },
        warnings: {
            existingName: "태그 이름이 이미 존재합니다. 다른 이름을 입력하십시오",
            emptyName: "빈 태그 이름을 가질 수 없습니다",
            unknownTagName: "알 수 없는 태그 이름", // Unknown"
        },
        toolbar: {
            add: "새 태그 추가",
            search: "태크 검색",
            edit: "태그 편집",
            lock: "태그 잠금",
            moveUp: "태그를 위로 이동",
            moveDown: "태그를 아래로 이동",
            delete: "태그 삭제", // Delete tag"
        },
    },
    connections: {
        title: "연결 설정",
        details: "설명",
        settings: "설정",
        instructions: "편집 할 연결 정보를 선택하십시오",
        save: "저장",
        messages: {
            saveSuccess: "${connection.name}을 성공적으로 저장했습니다",
            deleteSuccess: "${connection.name}을 삭제했습니다.", // Successfully deleted ${connection.name}"
        },
        imageCorsWarning: "경고 : 웹 브라우저에서 VoTT를 사용하는 경우 CORS (Cross Origin Resource Sharing) " +
            "제한으로 인해 Bing Image Search의 일부 정보가 제대로 내보내지지 않을 수 있습니다.",
        // Warning: When using VoTT in a Web browser, some assets from Bing Image Search may no export
        // correctly due to CORS (Cross Origin Resource Sharing) restrictions.",
        blobCorsWarning: "경고 : 소스 또는 대상 연결로 사용하려면, Azure Blob Storage 계정에서 CORS(Cross Domain Resource Sharing) " +
            "설정을 활성화 해야 합니다. CORS 설정에 대한 자세한 정보는 {0}에서 찾을 수 있습니다.",
        // Warning: CORS (Cross Domain Resource Sharing) must be enabled on the Azure Blob Storage account, in order
        // to use i as a source or target connection. More information on enabling CORS can be found in the {0}",
        azDocLinkText: "Azure 설명서.",
        providers: {
            azureBlob: {
                title: "Azure Blob 저장소",
                description: "",
                accountName: {
                    title: "계정 이름",
                    description: "",
                },
                containerName: {
                    title: "컨테이너 이름",
                    description: "",
                },
                sas: {
                    title: "SAS",
                    description: "Blob Storage 계정을 인증하는 데 사용되는 공유 액세스 서명",
                    // Shared access signature used to authenticate to the blob storage account"
                },
                createContainer: {
                    title: "컨테이너 만들기",
                    description: "Blob 컨테이너가 없으면 새로 생성합니다.",
                    // Creates the blob container if it does not already exist"
                },
            },
            bing: {
                title: "Bing 이미지 검색",
                options: {
                    title: "Bing 이미지 검색 옵션",
                },
                endpoint: {
                    title: "끝점",
                    description: "Bing 검색 Azure 리소스 내에 나열된 끝점",
                },
                apiKey: {
                    title: "API 키",
                    description: "Bing 검색 Azure 리소스 내에 나열된 API 키",
                },
                query: {
                    title: "쿼리",
                    description: "연결을 채우는 데 사용되는 검색 쿼리",
                },
                aspectRatio: {
                    title: "종횡비",
                    description: "지정된 종횡비로 결과를 필터링합니다.",
                    options: {
                        all: "모두",
                        square: "정사각형",
                        wide: "넓은",
                        tall: "긴", // Tall"
                    },
                },
                licenseType: {
                    title: "라이센스 유형",
                    description: "지정된 라이센스 유형으로 결과 필터링",
                    options: {
                        all: "모든 (이미지를 필터링하지 않음)",
                        any: "라이센스 유형이 있는 모든 이미지",
                        public: "퍼블릭 도메인",
                        share: "무료 공유 및 사용",
                        shareCommercially: "상업적으로 자유롭게 공유하고 사용할 수 있습니다.",
                        modify: "자유롭게 수정, 공유 및 사용",
                        modifyCommercially: "상업적으로 자유롭게 수정, 공유 및 사용",
                    },
                },
                size: {
                    title: "크기",
                    description: "지정된 크기로 결과를 필터링합니다.",
                    options: {
                        all: "모든",
                        small: "스몰(200x200 미만)",
                        medium: "중간(500x500 미만)",
                        large: "대형(500x500 이상)",
                        wallpaper: "배경 화면 (초대형 이미지)",
                    },
                },
            },
            local: {
                title: "로컬 파일 시스템",
                folderPath: "경로",
                selectFolder: "폴더 선택",
                chooseFolder: "선택", // Choose Folder"
            },
        },
    },
    editorPage: {
        width: "너비",
        height: "높이",
        tagged: "태그",
        visited: "방문",
        toolbar: {
            select: "선택 (V)",
            pan: "팬",
            drawRectangle: "사각형 그리기",
            drawPolygon: "다각형 그리기",
            copyRectangle: "사각형 복사",
            copy: "영역 복사",
            cut: "영역 잘라내기",
            paste: "영역 붙여 넣기",
            removeAllRegions: "모든 지역 제거",
            previousAsset: "이전 Asset",
            nextAsset: "다음 Asset",
            saveProject: "프로젝트 저장",
            exportProject: "프로젝트 내보내기",
            activeLearning: "Active Learning", // Active Learning"
        },
        videoPlayer: {
            previousTaggedFrame: {
                tooltip: "이전 태그 된 프레임", // Previous Tagged Frame"
            },
            nextTaggedFrame: {
                tooltip: "다음 태그 된 프레임", // Next Tagged Frame"
            },
            previousExpectedFrame: {
                tooltip: "이전 프레임", // Previous Frame"
            },
            nextExpectedFrame: {
                tooltip: "다음 프레임", // Next Frame"
            },
        },
        help: {
            title: "도움말",
            escape: "나가기", // Escape Help Menu"
        },
        assetError: "Asset을 불러올 수 없습니다",
        tags: {
            hotKey: {
                apply: "단축키로 태그 적용",
                lock: "단축키가 있는 태그 잠금", // Lock Tag with Hot Key"
            },
            rename: {
                title: "태그 이름 바꾸기",
                confirmation: "이 태그의 이름을 바꾸시겠습니까? 모든 Asset에서 이름이 변경됩니다",
                // Are you sure you want to rename this tag? It will be renamed throughout all assets"
            },
            delete: {
                title: "태그 삭제",
                confirmation: "이 태그를 삭제 하시겠습니까? 모든 Asset 및 태그가 유일한 지역 인 모든 지역에서 삭제됩니다.",
                // Are you sure you want to delete this tag? It will be deleted throughout all assets
                // and any regions where this is the only tag will also be deleted"
            },
        },
        canvas: {
            removeAllRegions: {
                title: "모든 지역 제거",
                confirmation: "모든 지역을 삭제 하시겠습니까?", // Are you sure you want to remove all regions"
            },
        },
        messages: {
            enforceTaggedRegions: {
                title: "유효하지 않은 지역이 감지되었습니다.",
                description: "1 개 이상의 지역이 태그되어야 합니다. 다음 작업을 계속 진행하기 위해 모든 지역에 태그가 지정되어 있는지 확인하십시오.",
                // 1 or more regions have not been tagged. Ensure all regions ar tagged before continuing to next asset"
            },
        },
    },
    export: {
        title: "내보내기",
        settings: "내보내기 설정",
        saveSettings: "내보내기 설정 저장",
        providers: {
            common: {
                properties: {
                    assetState: {
                        title: "Asset 상태",
                        description: "내보내기에 포함 할 Asset",
                        options: {
                            all: "모든 Asset",
                            visited: "방문한 Asset만",
                            tagged: "태그된 Asset만", // Only tagged Assets"
                        },
                    },
                    testTrainSplit: {
                        title: "테스트용 / 학습용 분할",
                        description: "내보내는 데이터에 테스트용 / 학습용 분할",
                        // The test train split to use for exported data"
                    },
                    includeImages: {
                        title: "이미지 포함",
                        description: "대상 연결에 이진 이미지 Asset을 포함할지 여부",
                        // Whether or not to include binary image assets in target connection"
                    },
                },
            },
            vottJson: {
                displayName: "VoTT JSON", // VoTT JSON
            },
            azureCV: {
                displayName: "Azure Custom Vision 서비스",
                regions: {
                    australiaEast: "호주 동부",
                    centralIndia: "중앙 인도",
                    eastUs: "미국 동부",
                    eastUs2: "미국 동부 2",
                    japanEast: "일본 동부",
                    northCentralUs: "미국 중북부",
                    northEurope: "북유럽",
                    southCentralUs: "미국 중남부",
                    southeastAsia: "동남아시아",
                    ukSouth: "영국 남부",
                    westUs2: "미국 서부 2",
                    westEurope: "서유럽", // West Europe"
                },
                properties: {
                    apiKey: {
                        title: "API 키", // API Key"
                    },
                    region: {
                        title: "지역",
                        description: "서비스가 배포 된 Azure 지역", // The Azure region where your service is deployed"
                    },
                    classificationType: {
                        title: "분류 유형",
                        options: {
                            multiLabel: "이미지 당 여러 태그",
                            multiClass: "이미지 당 단일 태그", // Single tag per image"
                        },
                    },
                    name: {
                        title: "프로젝트 이름", // Project Name"
                    },
                    description: {
                        title: "설명", // Project Description"
                    },
                    domainId: {
                        title: "도메인", // Domain"
                    },
                    newOrExisting: {
                        title: "신규 또는 기존 프로젝트",
                        options: {
                            new: "새로운 프로젝트",
                            existing: "기존 프로젝트", // Existing Project"
                        },
                    },
                    projectId: {
                        title: "프로젝트 이름", // Project Name"
                    },
                    projectType: {
                        title: "프로젝트 유형",
                        options: {
                            classification: "분류",
                            objectDetection: "물체 감지", // Object Detection"
                        },
                    },
                },
            },
            tfRecords: {
                displayName: "TensorFlow 기록", // Tensorflow Record"
            },
            pascalVoc: {
                displayName: "Pascal VOC",
                exportUnassigned: {
                    title: "할당되지 않은 태그 내보내기",
                    description: "내보내는 데이터에 할당되지 않은 태그를 포함할지 여부",
                    // Whether or not to include unassigned tags in exported data"
                },
            },
            cntk: {
                displayName: "Microsoft Cognitive Toolkit（CNTK）", // Microsoft Cognitive Toolkit (CNTK)"
            },
            csv: {
                displayName: "쉼표로 구분 된 값（CSV）", // Comma Separated Values (CSV)"
            },
        },
        messages: {
            saveSuccess: "내보내기 설정이 성공적으로 저장되었습니다", // Successfully saved export settings"
        },
    },
    activeLearning: {
        title: "Active Learning",
        form: {
            properties: {
                modelPathType: {
                    title: "모델 제공자",
                    description: "학습 모델을 불러올 위치",
                    options: {
                        preTrained: "미리 학습된 Coco SSD",
                        customFilePath: "사용자 정의 (파일 경로)",
                        customWebUrl: "사용자 정의 (URL)", // Custom (Url)"
                    },
                },
                autoDetect: {
                    title: "자동 감지",
                    description: "Asset 간을 탐색 할 때 자동 예측 여부",
                    // Whether or not to automatically make predictions as you navigate between assets"
                },
                modelPath: {
                    title: "모델 경로",
                    description: "로컬 파일 시스템에서 모델을 선택하십시오.", // Select a model from your local file system"
                },
                modelUrl: {
                    title: "모델 URL",
                    description: "URL에서 모델 불러오기", // Load your model from a public web URL"
                },
                predictTag: {
                    title: "태그 예측",
                    description: "예측에 태그를 자동으로 포함할지 여부", // Whether or not to automatically include tags in predictions"
                },
            },
        },
        messages: {
            loadingModel: "Active Learning 모델 불러오는 중 ...",
            errorLoadModel: "Active Learning 모델을 불러오는 중 오류가 발생했습니다",
            saveSuccess: "Active Learning 모델 설정을 성공적으로 저장했습니다", // Successfully saved active learning settings"
        },
    },
    profile: {
        settings: "프로필 설정", // Profile Settings"
    },
    errors: {
        unknown: {
            title: "알 수 없는 오류",
            message: "애플리케이션에 알 수 없는 오류가 발생했습니다. 다시 시도하십시오.", // The app encountered an unknown error. Please try again"
        },
        projectUploadError: {
            title: "파일 업로드 오류",
            message: "파일을 업로드하는 중에 오류가 발생했습니다. 파일이 올바른 형식인지 확인한 후 다시 시도하십시오.",
            // There was an error uploading the file. Please verify the file is of the correct format and try again."
        },
        genericRenderError: {
            title: "응용 프로그램 로딩 오류",
            message: "응용 프로그램을 렌더링하는 중에 오류가 발생했습니다. 다시 시도하십시오",
            // An error occured while rendering the application. Please try again"
        },
        projectInvalidSecurityToken: {
            title: "프로젝트 파일을 로드하는 중 오류가 발생했습니다",
            message: "프로젝트에서 참조한 보안 토큰이 유효하지 않습니다.응용 프로그램 설정 내에서 프로젝트의 보안 토큰이 올바르게 설정되었는지 확인하십시오",
            // The security token referenced by the project is invalid.
            // Verify that the security token for the project has been set correctly within your application settings"
        },
        projectInvalidJson: {
            title: "프로젝트 파일 파싱 오류",
            message: "선택한 프로젝트 파일에 유효한 JSON이 포함되어 있지 않습니다. 파일을 다시 확인하십시오.",
            // The selected project files does not contain valid JSON Please check the file any try again."
        },
        projectDeleteError: {
            title: "프로젝트 삭제 오류",
            message: "프로젝트를 삭제하는 중에 오류가 발생했습니다. 프로젝트 파일에 보안 토큰이 존재하는지 확인한 후 다시 시도하십시오.",
            // An error occured while deleting the project.
            // Validate the project file an security token exist and try again"
        },
        securityTokenNotFound: {
            title: "프로젝트 파일을 로드하는 중 오류가 발생했습니다",
            message: "프로젝트가 참조하는 보안 토큰을 현재 애플리케이션 설정에서 찾을 수 없습니다. 보안 토큰이 있는지 확인하고 프로젝트를 다시로드하십시오.",
            // The security token referenced by the project cannot be found in your current application settings.
            // Verify the security token exists and try to reload the project."
        },
        canvasError: {
            title: "캔버스 불러 오기 오류",
            message: "캔버스를 로드하는 중에 오류가 발생했습니다. 프로젝트 Asset을 확인한 후 다시 시도하십시오.",
            // There was an error loading the canvas, check the project's assets and try again."
        },
        importError: {
            title: "V1 프로젝트 가져 오기 오류",
            message: "V1 프로젝트를 가져 오는 중에 오류가 발생했습니다. 프로젝트 파일을 확인하고 다시 시도하십시오.",
            // There was an error importing the V1 project. Check the project file and try again"
        },
        pasteRegionTooBigError: {
            title: "지역 붙여 넣기 오류",
            message: "이 Asset에 비해 지역이 너무 큽니다. 다른 지역을 복사 해보십시오.",
            // Region too big for this asset. Try copying another region"
        },
        exportFormatNotFound: {
            title: "프로젝트 내보내기 오류",
            message: "프로젝트에 내보내기 형식이 없습니다. 내보내기 설정 페이지에서 내보내기 형식을 선택하십시오.",
            // Project is missing export format. Please select an export format in the export setting page."
        },
        activeLearningPredictionError: {
            title: "Active Learning 오류",
            message: "현재 Asset의 지역을 예측하는 동안 오류가 발생했습니다. Active Learning 구성을 확인하고 다시 시도하십시오",
            // An error occurred while predicting regions in the current asset.
            // Please verify your active learning configuration and try again"
        },
    },
};
