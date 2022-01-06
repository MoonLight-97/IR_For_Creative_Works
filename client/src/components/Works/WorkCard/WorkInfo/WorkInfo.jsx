import React from "react";
import css from "./WorkInfo.module.scss";
import likeIcon from "./like-heart.svg"
import commentsIcon from "./comments.svg"
import downloadIcon from "./ic-download.svg"


const WorkInfo = () => {
    return <div className={css.workInfoPage}>

        <div className={css.workInfoCard}>
            <div className={css.firstTitle}>Название публикации</div>
            <div className={css.item}><span className={css.fieldDescription}>Автор: </span><span>Р.Л.Стайн</span></div>
            <div className={css.item}><span className={css.fieldDescription}>Статус: </span><span className={css.status}>Завершён</span></div>
            <div className={css.descriptionContainer}>
                <span className={css.fieldDescription}>Размер: </span>
                <div className={css.size}>Мини</div>
                <div className={css.info}>1 страница</div>
                <div className={css.info}>1 часть</div>
            </div>
            <div className={css.btnContainer}>

                <div className={css.btn}>
                    <div className={css.info}>
                        <img src={likeIcon} className={css.icon}/>
                        <div className={css.count}>23</div>
                    </div>
                    <div className={css.title}>Нравится</div>
                </div>

                <div className={css.space}></div>

                <div className={css.btn}>
                    <div className={css.info}>
                        <img src={commentsIcon} className={css.icon}/>
                        <div className={css.count}>4</div>
                    </div>
                    <div className={css.title}>Комментарии</div>
                </div>

                <div className={css.space}></div>

                <div className={css.btn}>
                    <div className={css.info}>
                        <img src={downloadIcon} className={css.icon}/>
                    </div>
                    <div className={css.title}>Скачать</div>
                </div>

            </div>
        </div>

        <div className={css.workCard}>
            <div className={css.title}>Название публикации</div>
            <div className={css.text}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan, massa vitae finibus condimentum, metus justo semper nunc, id condimentum diam tortor ac leo. Donec ornare nec felis quis aliquam. Aliquam enim lectus, facilisis porttitor maximus a, mollis sit amet arcu. Aliquam finibus lobortis varius. Quisque porttitor tincidunt ligula, malesuada efficitur ex elementum non. Suspendisse potenti. Proin tempus, leo vel porta pretium, lacus neque consequat turpis, sed auctor elit arcu quis metus. Donec laoreet lacinia ipsum at mollis. Praesent mattis nibh massa, in fermentum nisi commodo aliquet. In ut iaculis nisl. Donec et tempor nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam lacinia lorem quis dui eleifend, eget iaculis ante scelerisque. Praesent neque dui, vestibulum at diam a, tincidunt porttitor ante.</p>
                <p>Aenean in vestibulum tellus, in volutpat urna. Integer vel libero eu odio congue finibus. Nulla mollis scelerisque vulputate. Duis tempor velit eu sem condimentum ullamcorper. Pellentesque eu turpis eros. Vestibulum quam ex, faucibus non turpis sed, sollicitudin bibendum felis. In porta ante risus, a viverra enim rutrum id. Sed luctus sem suscipit erat mollis dictum. Sed sed tempor velit. Integer quis ultricies mauris. Nulla tristique ipsum eu eros vehicula pharetra. Maecenas cursus lorem at ante egestas imperdiet. Sed placerat suscipit dictum. Integer mauris magna, porttitor sed lorem vel, tincidunt sodales tortor. Praesent sodales, ligula a finibus lobortis, nisl justo malesuada leo, quis vestibulum est quam in mauris.</p>
                <p>Maecenas condimentum lectus vel ullamcorper pretium. Phasellus in magna aliquet, pulvinar metus dignissim, sodales nibh. Fusce fringilla lacus ut mi viverra, eget mattis lorem ornare. Vestibulum id pulvinar turpis, vel varius lacus. Morbi porttitor velit sed diam rhoncus, sed vestibulum turpis condimentum. Nunc vulputate consectetur mattis. Donec eu erat in metus faucibus porta. Proin finibus fermentum nisl et malesuada. In dapibus ligula ligula, at bibendum lorem placerat non. Aenean condimentum egestas tellus quis pretium. Curabitur blandit purus dui, id accumsan magna hendrerit eu. Nullam blandit lorem maximus, finibus mauris sit amet, finibus lacus.</p>
                <p>Etiam aliquam augue sit amet velit tempor, in sagittis dolor lobortis. In fringilla ante risus. Proin eget scelerisque erat. Nulla in arcu molestie, ullamcorper diam quis, scelerisque enim. Mauris at leo pharetra, maximus nunc et, elementum diam. Nam molestie diam a volutpat condimentum. Nunc sapien ligula, posuere eu viverra eu, tristique eu quam. Nulla et laoreet quam. Nulla viverra tortor ac tristique ultrices. Phasellus fermentum mauris vitae blandit mollis.</p>
                <p>Aenean eget vehicula risus, nec aliquam elit. Sed quis leo nisi. Nullam vulputate elit risus, eget volutpat eros varius quis. Aliquam aliquet nisi vitae mollis semper. Mauris eget libero at odio tincidunt porttitor vel vitae dui. Praesent blandit metus fringilla vulputate scelerisque. Fusce pellentesque, dolor sit amet euismod euismod, velit nisl elementum nibh, sit amet blandit lacus augue sodales nulla. Vivamus vulputate, risus sed finibus dignissim, lacus lectus semper tortor, in iaculis est lorem at justo. Sed eros neque, dignissim a dui et, bibendum tincidunt dui. Integer viverra, purus id iaculis rhoncus, sapien nibh fermentum nunc, gravida feugiat mauris velit a massa. Proin fringilla odio vel orci varius eleifend. Nam eget elit ut ante lacinia lobortis.</p>
                <p>Suspendisse eget malesuada enim, sed ultricies odio. Maecenas accumsan leo id sollicitudin blandit. Aenean metus nunc, porttitor ac neque a, vestibulum euismod nulla. Donec eleifend imperdiet consectetur. Suspendisse posuere erat in condimentum ultricies. Cras ultricies euismod sem. Praesent nec semper arcu. Nam auctor faucibus diam, eu varius urna elementum porttitor. Phasellus eget dictum justo, quis condimentum odio.</p>
                <p>Integer eu risus elit. Sed laoreet lectus a erat venenatis cursus. Donec sodales eros non dolor cursus, sed posuere metus convallis. Nam mi risus, posuere eget semper id, viverra vitae mi. Proin aliquet libero ac leo tincidunt rhoncus sollicitudin at neque. Etiam pharetra venenatis neque ac bibendum. Quisque in enim pretium, cursus nulla sit amet, placerat nunc. In consequat arcu et nisl convallis, nec hendrerit mauris imperdiet. Praesent at vehicula arcu, ut tincidunt nulla.</p>
                <p>Curabitur vel urna vitae risus convallis malesuada ut nec magna. Pellentesque quis magna ligula. Phasellus rutrum sed orci in fringilla. Mauris magna dui, maximus in sollicitudin a, faucibus ac eros. Praesent iaculis accumsan justo, et maximus nibh lacinia eu. In tincidunt elit ex, vel dictum nulla imperdiet consequat. Cras aliquet scelerisque est, ut mollis neque accumsan nec. Pellentesque sit amet gravida nisi. Nulla a nisi mi. Cras nisi ex, tincidunt et dui nec, vulputate malesuada leo. Duis turpis nisi, faucibus ac egestas id, rhoncus nec felis. Proin ultricies urna venenatis tellus condimentum ullamcorper. Aenean accumsan vehicula erat. In neque nulla, euismod consectetur consectetur et, elementum ut est. Donec posuere dui eget ultricies sagittis. Curabitur finibus eu enim sed consequat.</p>
                <p>Vivamus vel neque vel nisl tristique ornare in ac nisl. Cras arcu turpis, ullamcorper sed ex ac, elementum scelerisque ipsum. Pellentesque ut sollicitudin ex. Aenean quis lacinia lacus. Praesent at leo massa. Nulla nec quam et nunc suscipit interdum. Vivamus non maximus neque, eget hendrerit nisi. Donec consequat ligula in libero iaculis finibus. Etiam hendrerit odio eget ipsum ultrices, non maximus orci varius. Proin non nulla faucibus, ultricies urna id, rutrum velit. Curabitur aliquam ipsum id tortor lacinia volutpat. Pellentesque venenatis neque mi, a imperdiet purus elementum aliquet. Proin elementum interdum orci eu pellentesque. Praesent in ligula nec ipsum egestas ultrices in vel ante.</p>
                <p>Pellentesque vel lorem malesuada, porta purus ut, dignissim justo. Integer ac congue ante. Maecenas molestie lectus dictum consequat aliquet. Pellentesque venenatis enim ac ipsum fringilla, sed placerat erat interdum. Integer congue nisl tortor, id placerat neque congue ac. Fusce luctus molestie nisl sed volutpat. Sed tortor massa, pulvinar a auctor vitae, tristique quis massa.</p>
            </div>
        </div>

    </div>
}

export default WorkInfo;